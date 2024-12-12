import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany();
    return Response.json(teachers, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error fetching teachers' }, { status: 500 });
  }
}

export async function POST(req) {
  const { name, subject, contact } = await req.json();

  try {
    const newTeacher = await prisma.teacher.create({
      data: { name, subject, contact },
    });
    return Response.json(newTeacher, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Error creating teacher' }, { status: 500 });
  }
}