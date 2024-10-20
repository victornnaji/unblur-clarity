import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/admin";
import { mapReplicateResponseToPredictionDto } from "@/utils/api-helpers/client";
import invariant from "tiny-invariant";
import { uploadImageToCloudinary } from "@/utils/api-helpers/server";
import { validateWebhook } from "replicate";
import { CloudinaryError } from "@/errors/CloudinaryError";
import { updatePredictionByAdmin } from "@/data/services/predictions.service";

invariant(
  process.env.REPLICATE_WEBHOOK_SECRET,
  "REPLICATE_WEBHOOK_SECRET is not set"
);
export async function POST(req: Request) {
  const secret = process.env.REPLICATE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { detail: "Webhook received (but not validated)" },
      { status: 200 }
    );
  }

  const isValidWebhook = await validateWebhook(req.clone(), secret);

  if (!isValidWebhook) {
    return NextResponse.json({ detail: "Webhook is invalid" }, { status: 401 });
  }

  const body = await req.json();

  const urlObj = new URL(req.url);
  const userId = urlObj.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { detail: "User ID is required" },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.admin.getUserById(userId);

  if (userError) {
    console.error("Error fetching user:", userError);
    return NextResponse.json(
      {
        message: userError.message,
      },
      { status: 401 }
    );
  }

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const response = mapReplicateResponseToPredictionDto(body);
    const replicateImage = Array.isArray(body.output) ? body.output[0] : body.output;
    const { url: secureUrl } = await uploadImageToCloudinary(
      replicateImage,
      "unblurred-photos"
    );
    await updatePredictionByAdmin({
      ...response,
      image_url: secureUrl,
    });
    return NextResponse.json({ success: true, status: 201 });
  } catch (error) {
    if(error instanceof CloudinaryError) {
      return NextResponse.json(
        { error },
        { status: 500 }
      );
    };
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
