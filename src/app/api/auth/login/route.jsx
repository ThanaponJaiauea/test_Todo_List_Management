import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateLoginInput from "@/validators/validate-login";

export async function POST(req) {
  try {
    const body = await req.json();

    const validationErrors = validateLoginInput(body);

    if (validationErrors) {
      return NextResponse.json(
        { message: "Validation failed", errors: validationErrors },
        { status: 400 },
      );
    }

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 },
      );
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 },
      );
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
