import connectToDatabase from "@/libs/db";
import Note from "@/types/note.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { title, description } = await request.json();

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 }
    );
  }

  if (title.length < 3) {
    return NextResponse.json(
      { error: "Title must be at least 3 characters long" },
      { status: 400 }
    );
  }

  if (description.length < 3) {
    return NextResponse.json(
      { error: "Description must be at least 3 characters long" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const note = await Note.create({ title, description });
    return NextResponse.json(
      { message: "Note created successfully", note },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
