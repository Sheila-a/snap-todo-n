/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { findUserByEmail, createToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "EMAIL_AND_PASSWORD_REQUIRED" },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "INVALID_PASSWORD" }, { status: 401 });
    }

    const token = createToken({ sub: user.id, email: user.email });

    const res = NextResponse.json({ user, token });
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
  }
}
