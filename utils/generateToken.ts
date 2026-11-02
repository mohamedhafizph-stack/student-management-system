import jwt from "jsonwebtoken";

export function generateToken(userId: string, role: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing");
  return jwt.sign({ userId, role }, secret, { expiresIn: "1d" });
}