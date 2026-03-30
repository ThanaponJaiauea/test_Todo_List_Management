import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeToken } from "@/utils/jwt";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // ← await ก่อนเลย

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await decodeToken(token);

    if (!decoded) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    const todoId = parseInt(id);

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    // แปลงให้เป็น number ทั้งคู่ก่อนเปรียบเทียบ
    if (todo.userId !== Number(decoded.id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE_TODO_ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
