# SNAP TODO NEXT

A **full-stack Todo application** built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, featuring a mock **authentication system** powered by Next.js API routes — all contained within the same project.

Originally built with React, **Snap Todo** was fully converted to Next.js with TypeScript to leverage server-side rendering, route handling, and integrated backend APIs — offering a realistic simulation of a production-ready environment.

## Overview

**Snap Todo** is a sleek, user-friendly todo manager that lets users:

- Create an account
- Log in securely
- Manage todos privately
- Stay authenticated via cookies
- Enjoy a responsive, minimal design

Although this version doesn’t use a real database, it mimics backend behavior using **Next.js API routes** and a **temporary in-memory store** that behaves like a real backend system.

## Tech Stack

| Category               | Technology                                                                     |
| ---------------------- | ------------------------------------------------------------------------------ |
| Framework              | [Next.js 15 (App Router)](https://nextjs.org/docs/app)                         |
| Language               | TypeScript                                                                     |
| Styling                | [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/) |
| State / Data           | [TanStack Query (React Query)](https://tanstack.com/query/latest)              |
| Authentication         | Custom JWT-based auth via Next.js API Routes                                   |
| Storage                | In-memory (temporary)                                                          |
| Toasts / Notifications | [Sonner](https://sonner.emilkowal.ski/)                                        |
| Deployment             | [Vercel](https://vercel.com/)                                                  |

## Authentication Logic

Snap Todo uses **Next.js API routes** as a pseudo-backend. The flow mimics a real production backend setup with JWT authentication and cookies.

### Signup Flow

1. User submits name, email, and password to `/api/auth/register`.
2. The route checks if an email already exists.
3. If unique, the user is created in memory (or local JSON file in dev).
4. A JWT token is generated using a secret key.
5. The token is stored in an **HTTP-only cookie** for session persistence.

### Login Flow

1. User submits credentials to `/api/auth/login`.
2. The route finds the user and compares passwords.
3. On success, a JWT token is issued and set in cookies.
4. The frontend is redirected to `/app/todos`.

### Protected Routes

- The `/app/todos` page checks for a valid token (via `/api/auth/me`).
- If no token is found, the user is redirected back to `/`.

## Deployment

The app is deployed on Vercel.
Because Vercel’s filesystem is read-only, JSON file persistence is disabled in production.
For demonstration, user data is stored in-memory per server instance.

## Usage

Visit [SNAP TODO NEXT](https://snap-todo-n.vercel.app/todos)
