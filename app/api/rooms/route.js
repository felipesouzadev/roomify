import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rooms = await prisma.room.findMany();
    return new Response(JSON.stringify(rooms), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching rooms' }), { status: 500 });
  }
}

export async function POST(req) {
  const { name, capacity } = await req.json();
  try {
    const newRoom = await prisma.room.create({
      data: { name, capacity },
    });
    return new Response(JSON.stringify(newRoom), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating room' }), { status: 500 });
  }
}

export async function PUT(req) {
  const { id, name, capacity } = await req.json();

  try {
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: { name, capacity },
    });
    return new Response(JSON.stringify(updatedRoom), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating room' }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.room.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting room' }), { status: 500 });
  }
}
