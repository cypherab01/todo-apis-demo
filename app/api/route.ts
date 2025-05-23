import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  return NextResponse.json({ status: "serving" }, { status: 200 });
};
