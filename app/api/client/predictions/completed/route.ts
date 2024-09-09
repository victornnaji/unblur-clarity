import { getCompletedPredictionsByUser } from "@/utils/supabase/actions";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const predictions = await getCompletedPredictionsByUser(supabase);

  return NextResponse.json(predictions);
}
