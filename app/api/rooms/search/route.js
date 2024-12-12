import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const queryParameters = req.nextUrl.searchParams;
  const startDate = queryParameters.get('startDate');
  const endDate = queryParameters.get('endDate');
  const shift = queryParameters.get('shift');
  const capacity = queryParameters.get('capacity');
  const weekday = queryParameters.get('weekday').trim().split(",").map(Number);
  const resources = queryParameters.get('resources') ? queryParameters.get('resources').trim().split(",").map(Number) : [];

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

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
                  startDate: { lte: start },
                  endDate: { gte: end },
                  shift: shift.toUpperCase(),
                  weekday: {hasSome: weekday}
                }
              ]
            },
          },
          roomResources: {
            some: {
              resourceId: { in: resources },
            },
        },
      },
      include: {
        roomResources: {
          include: {
            resource: true, // Include resource details
          },
        },
      },
      });

    return Response.json(availableRooms, { status: 200 });
  } catch (error) {
    return  Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
