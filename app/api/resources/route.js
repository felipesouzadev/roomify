import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const teachers = await prisma.resource.findMany();
    return  Response.json(teachers, { status: 200 });
  } catch (error) {
    return  Response.json({ error: 'Error fetching teachers' }, { status: 500 });
  }
}