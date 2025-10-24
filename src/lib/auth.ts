import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

type User = {
  id: string;
  email: string;
  name?: string;
  passwordHash: string;
  createdAt: string;
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(USERS_FILE))
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

export async function readUsers(): Promise<User[]> {
  ensureDataDir();
  const raw = fs.readFileSync(USERS_FILE, 'utf-8');
  try {
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

export async function writeUsers(users: User[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function findUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function createUser({
  name,
  email,
  password,
}: {
  name?: string;
  email: string;
  password: string;
}) {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error('EMAIL_EXISTS');

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const users = await readUsers();
  const id = String(Date.now()) + Math.floor(Math.random() * 1000);
  const user = {
    id,
    email,
    name,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeUsers(users);
  return { id: user.id, email: user.email, name: user.name };
}

export async function verifyPassword(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return false;
  return bcrypt.compareSync(password, user.passwordHash);
}

export function createToken(payload: object) {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as StringValue;

  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET!;
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
