import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany();
    return new Response(JSON.stringify(teachers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching teachers' }), { status: 500 });
  }
}

export async function POST(req) {
  const { name, subject, contact } = await req.json();

  try {
    const newTeacher = await prisma.teacher.create({
      data: { name, subject, contact },
    });
    return new Response(JSON.stringify(newTeacher), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating teacher' }), { status: 500 });
  }
}

export async function PUT(req) {
  const { id, name, subject } = await req.json();

  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: { name, subject },
    });
    return new Response(JSON.stringify(updatedTeacher), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating teacher' }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.teacher.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting teacher' }), { status: 500 });
  }
}
