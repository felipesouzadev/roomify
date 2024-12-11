import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const { teacherId, roomId, shift, startDate, endDate, weekday } = await req.json();
  
    try {
      const newSchedule = await prisma.schedule.create({
        data: { teacher_id: teacherId, room_id: roomId, shift, weekday: weekday, start_date: new Date(startDate), end_date: new Date(endDate) },
      });
      return new Response(JSON.stringify(newSchedule), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Error scheduling room' }), { status: 500 });
    }
  }