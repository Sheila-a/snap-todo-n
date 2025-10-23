import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/auth';

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email)
    return NextResponse.json({ error: 'EMAIL_REQUIRED' }, { status: 400 });

  const user = await findUserByEmail(email);
  if (!user) {
    // for security, respond with success even if email not found (better practice)
    return NextResponse.json({ ok: true });
  }

  // Here you'd generate a reset token and email it.
  // We'll return a fake resetToken for demo:
  const resetToken = `reset-${Date.now()}`;

  // In dev, return token so you can test flow
  return NextResponse.json({ ok: true, resetToken });
}
