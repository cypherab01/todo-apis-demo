import connectToDatabase from "@/libs/db";
import Note from "@/types/note.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const { title, description } = await request.json();
  try {
    await connectToDatabase();
    const note = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
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

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    return NextResponse.json(
      { message: "Note updated successfully", updatedNote },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// delete note

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  try {
    await connectToDatabase();
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
