// src/app/api/todolist/edit/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeToken } from "@/utils/jwt";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await decodeToken(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, completed } = body;

    const todoId = parseInt(id);

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    if (todo.userId !== Number(decoded.id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.todo.update({
      where: { id: todoId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
      },
    });

    return NextResponse.json({ todo: updated }, { status: 200 });
  } catch (error) {
    console.error("EDIT_TODO_ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
