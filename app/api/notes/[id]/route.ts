import connectToDatabase from "@/libs/db";
import Note from "@/types/note.model";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, description } = await request.json();

  try {
    await connectToDatabase();

    // Validate input first before database operations
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (title.length < 3) {
      return NextResponse.json(
        { error: "Title must be at least 3 characters long" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (description.length < 3) {
      return NextResponse.json(
        { error: "Description must be at least 3 characters long" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { error: "Note not found" },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      { message: "Note updated successfully", updatedNote },
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
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return NextResponse.json(
        { error: "Note not found" },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
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
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
