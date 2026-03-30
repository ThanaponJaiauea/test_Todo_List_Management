import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import validateRegisterInput from "@/validators/validate-register";

export async function POST(req) {
  try {
    const body = await req.json();

    const validationErrors = validateRegisterInput(body);

    if (validationErrors) {
      return NextResponse.json(
        { message: "Validation failed", errors: validationErrors },
        { status: 400 },
      );
    }

    const { email, password, firstName, lastName, mobile } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile || null,
      },
    });

    return NextResponse.json(
      { message: "Register success. Please log in to continue." },
      { status: 201 },
    );
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
