import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const { teacherId, roomId, shift, startDate, endDate, weekday } = await req.json();
    const start = new Date(startDate)
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    try {
      const newSchedule = await prisma.schedule.create({
        data: { teacherId, roomId, shift, weekday: weekday, startDate: start, endDate: end },
      });
      return Response.json(newSchedule, { status: 201 });
    } catch (error) {
      return Response.json({ error: 'Error scheduling room' }, { status: 500 });
    }
  }