import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      where:{
        isActive: true
      }
    });
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error fetching rooms' }, { status: 500 });
  }
}

export async function POST(req) {
  const { name, username, password, } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.users.create({
      data: { name, username, password:hashedPassword, isOwner: false },
    });
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Error creating room' }, { status: 500 });
  }
}

export async function PUT(req) {
  const { id, name, capacity } = await req.json();

  try {
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: { name, capacity },
    });
    return Response.json(updatedRoom, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error updating room' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.room.update({
      where: { id },
      data: {
        isActive: false
      }
    });
    return Response.json(null, { status: 204 });
  } catch (error) {
    return Response.json({ error: 'Error deleting room' }, { status: 500 });
  }
}
