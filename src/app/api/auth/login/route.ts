/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { findUserByEmail, verifyPassword, createToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { error: 'Email & Password required!' },
        { status: 400 }
      );

    const user = await findUserByEmail(email);
    if (!user)
      return NextResponse.json(
        { error: 'User does not exist on records! Create account' },
        { status: 404 }
      );

    const ok = await verifyPassword(email, password);
    if (!ok)
      return NextResponse.json(
        { error: 'Invalid credentials!' },
        { status: 401 }
      );

    const token = createToken({ sub: user.id, email: user.email });

    const res = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 });
  }
}
