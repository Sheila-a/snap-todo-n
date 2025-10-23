/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { createUser, createToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'EMAIL_AND_PASSWORD_REQUIRED' },
        { status: 400 }
      );
    }

    try {
      const user = await createUser({ name, email, password });
      const token = createToken({ sub: user.id, email: user.email });

      const res = NextResponse.json({ user, token });
      // set cookie
      res.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    } catch (err: any) {
      if (err.message === 'EMAIL_EXISTS') {
        return NextResponse.json({ error: 'EMAIL_EXISTS' }, { status: 409 });
      }
      return NextResponse.json({ error: 'UNKNOWN_ERROR' }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 });
  }
}
