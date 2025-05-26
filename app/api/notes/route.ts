import connectToDatabase from "@/libs/db";
import Note from "@/types/note.model";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (request: NextRequest) => {
  try {
    await connectToDatabase();
    const notes = await Note.find();
    const notesLength = notes.length;
    return NextResponse.json(
      { notes, notesLength },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};

export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
};
