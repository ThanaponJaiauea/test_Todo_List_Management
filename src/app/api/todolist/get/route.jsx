// src/app/api/todolist/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decodeToken } from "@/utils/jwt";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    const where = {
      userId: decoded.id, // ← กรองแค่ของ user ที่ login อยู่
      ...(search && {
        title: { contains: search, mode: "insensitive" },
      }),
    };

    const [todos, total] = await Promise.all([
      prisma.todo.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      prisma.todo.count({ where }),
    ]);

    return NextResponse.json(
      {
        todos,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET_TODOS_ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
