import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export const signToken = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.JWT_EXPIRES_IN || "7d")
    .sign(SECRET);
};

export const decodeToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    console.error("JWT Verify Error:", error);
    return null;
  }
};
