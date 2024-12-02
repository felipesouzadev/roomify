// /app/api/auth/login/route.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({message: 'Login successful'})
    response.cookies.set('token', token, {  httpOnly: true,
                                            maxAge: 60*60,
                                            secure: process.env.NODE_ENV === 'production',
                                            path: '/',
                                            sameSite: 'strict'
                                          });

    return response;

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
