import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const queryParameters = req.nextUrl.searchParams;
  const startDate = queryParameters.get('startDate');
  const endDate = queryParameters.get('endDate');
  const shift = queryParameters.get('shift');
  const capacity = queryParameters.get('capacity');
  const weekday = queryParameters.get('weekday').split(",").map(Number);

  if (!startDate || !endDate || !shift || !capacity || !weekday) {
    return new  Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    const availableRooms = await prisma.room.findMany({
        where: {
          capacity: { gte: parseInt(capacity) },
          schedules: {
            none: {
              AND: [
                {
                  start_date: { lte: new Date(startDate) },
                  end_date: { gte: new Date(endDate) },
                  shift: shift.toUpperCase(),
                  weekday: {hasSome: weekday}
                }
              ]
            },
          },
        },
      });

    return new Response(JSON.stringify(availableRooms), { status: 200 });
  } catch (error) {
    return new  Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
