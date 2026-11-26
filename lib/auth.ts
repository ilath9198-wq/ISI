import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET_STRING = process.env.ADMIN_JWT_SECRET || 'isi_secure_admin_jwt_secret_key_2026_xyz987';
const secretKey = new TextEncoder().encode(JWT_SECRET_STRING);

const DEFAULT_ADMIN_USER = process.env.ADMIN_DEFAULT_USER || 'admin';
const DEFAULT_ADMIN_PASS = process.env.ADMIN_DEFAULT_PASSWORD || 'isi@2026!secure';

export async function verifyAdminCredentials(
  user: string,
  pass: string
): Promise<boolean> {
  if (user === DEFAULT_ADMIN_USER && pass === DEFAULT_ADMIN_PASS) {
    return true;
  }
  return false;
}

export async function createAdminToken(username: string): Promise<string> {
  return await new SignJWT({ sub: username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function verifyAdminToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (payload.role === 'admin' && typeof payload.sub === 'string') {
      return { username: payload.sub };
    }
  } catch (e) {
    return null;
  }
  return null;
}

export async function getAuthenticatedAdmin(): Promise<{ username: string } | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('isi_admin_token')?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}
