import { NextResponse } from "next/server";
import { validateWebhook } from "replicate";
import { updatePrediction } from "@/utils/supabase/actions";
import { createServiceRoleClient, uploadImageToSupabase } from "@/utils/supabase/admin";
import { mapReplicateResponseToPredictionDto } from "@/utils/api-helpers/client";
import invariant from "tiny-invariant";
import { uploadImageToCloudinary } from "@/utils/api-helpers/server";

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
    const image = Array.isArray(body.output) ? body.output[0] : body.output;
    const signedUrl = await uploadImageToCloudinary(image, 'unblurred-photos');
    await updatePrediction(supabase, { ...response, image_url: signedUrl.url });
    return NextResponse.json({ success: true, status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
