import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import validateTodoInput from "@/validators/validate-todolist";
import { decodeToken } from "@/utils/jwt.jsx";

export async function POST(req) {
  try {
    const body = await req.json();

    const error = validateTodoInput(body);
    if (error) {
      return NextResponse.json(
        { message: "Validation Error", errors: error },
        { status: 400 },
      );
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await decodeToken(token);

    if (!decoded) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    const { title, description } = body;

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: decoded.id,
      },
    });

    return NextResponse.json({ todo }, { status: 201 });
  } catch (error) {
    console.error("CREATE_TODO_ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
