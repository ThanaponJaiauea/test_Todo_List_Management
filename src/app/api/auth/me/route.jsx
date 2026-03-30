import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const authorization = req.headers.get("authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        mobile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  }
}
