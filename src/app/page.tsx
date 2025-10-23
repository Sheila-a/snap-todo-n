/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { Loader2 } from 'lucide-react';

const brandBg = 'bg-[#071847]';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#071847]'>
      <Toaster position='top-right' richColors />
      <div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-[#435172] backdrop-blur-2xl'>
        <h1 className='text-2xl font-semibold text-white/90 mb-6'>
          {mode === 'login'
            ? 'Login'
            : mode === 'signup'
            ? 'Create account'
            : 'Forgot password'}
        </h1>

        {mode === 'login' && <LoginForm />}
        {mode === 'signup' && <SignupForm />}
        {mode === 'forgot' && <ForgotForm />}

        <div className='mt-6 text-sm text-center text-slate-300'>
          {mode === 'login' ? (
            <div className='flex items-center justify-between'>
              <div>
                Don&apos;t have an account?{' '}
                <button
                  className='text-[#071847] underline cursor-pointer hover:text-white'
                  onClick={() => setMode('signup')}
                >
                  Sign up
                </button>{' '}
              </div>

              <button
                className='underline cursor-pointer hover:text-white'
                onClick={() => setMode('forgot')}
              >
                Forgot password?
              </button>
            </div>
          ) : mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <button
                className='text-[#071847] underline cursor-pointer hover:text-white'
                onClick={() => setMode('login')}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Remembered your password?{' '}
              <button
                className='text-[#071847] underline cursor-pointer hover:text-white'
                onClick={() => setMode('login')}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- LOGIN FORM ---------- */
function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const loadId = toast.loading('Authenticating...');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setTimeout(() => {
        if (!res.ok) {
          toast.dismiss(loadId);
          toast.error(data?.error || 'Login failed');
          setLoading(false);
          return;
        }
        toast.success('Logged in');
        router.push('/todos');
        toast.dismiss(loadId);
      }, 3000);
    } catch (err) {
      // toast.dismiss(loadId);
      toast.error('Network error');
    } finally {
      setTimeout(() => {
        setLoading(false);
        // toast.dismiss(loadId);
      }, 3000);
    }
  }

  return (
    <form onSubmit={submit} className='space-y-4'>
      <Input
        placeholder='Email'
        value={email}
        className='py-6'
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='Password'
        type='password'
        value={password}
        className='py-6'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className={`${brandBg} w-full cursor-pointer py-6 mt-6`}
        type='submit'
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className='animate-spin w-4 h-4 border-[#d2f5f1//]' />
            <span>Logging in...</span>
          </>
        ) : (
          'Login'
        )}
      </Button>
    </form>
  );
}

/* ---------- SIGNUP FORM ---------- */
function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const loadId = toast.loading('Creating account...');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setTimeout(() => {
        if (!res.ok) {
          if (data?.error === 'EMAIL_EXISTS')
            toast.error('Email already exists');
          else toast.error(data?.error || 'Signup failed');
          setLoading(false);
          return;
        }
        toast.success('Account created');
        router.push('/todos');
      }, 3000);
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className='space-y-4'>
      <Input
        placeholder='Full name'
        value={name}
        className='py-6'
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder='Email'
        value={email}
        className='py-6'
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='Password'
        type='password'
        value={password}
        className='py-6'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className={`${brandBg} w-full cursor-pointer py-6 mt-6`}
        type='submit'
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className='animate-spin w-4 h-4 border-[#d2f5f1//]' />
            <span>Creating account...</span>
          </>
        ) : (
          'Create account'
        )}
      </Button>
    </form>
  );
}

/* ---------- FORGOT FORM ---------- */
function ForgotForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || 'Failed');
      } else {
        toast.success('If that email exists, a reset link was sent.');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className='space-y-4'>
      <Input
        placeholder='Email'
        value={email}
        className='py-6'
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        className={`${brandBg} w-full cursor-pointer py-6 mt-6`}
        type='submit'
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className='animate-spin w-4 h-4 border-[#d2f5f1//]' />
            <span>Sending...</span>
          </>
        ) : (
          'Send reset link'
        )}
      </Button>
    </form>
  );
}
