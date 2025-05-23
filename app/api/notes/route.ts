import connectToDatabase from "@/libs/db";
import Note from "@/types/note.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDatabase();
    const notes = await Note.find();
    const notesLength = notes.length;
    return NextResponse.json({ notes, notesLength }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
