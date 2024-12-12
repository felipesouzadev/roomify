import { PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({include:{roomResources: {include: {resource: true}}}});
    return Response.json(rooms, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error fetching rooms' }, { status: 500 });
  }
}

export async function POST(req) {
  const { name, capacity, resources } = await req.json();

  const roomResources = await Promise.all(
    resources.map(async (resource) => {
      if (resource.id) {
        return {
            resourceId:  resource.id,
            value: resource.value ? String(resource.value) : "1",
        }
      } else {
        const existingResource = await prisma.resource.findFirst({  where: { name: resource.name } });
        if (existingResource) {
          return {
              resourceId: existingResource.id,
              value: resource.value ? String(resource.value) : "1"
          };
        }
        const createdResource = await prisma.resource.create({
          data: { name: resource.name, type: resource.type },
        });
        return {
            resourceId: createdResource.id,
            value: resource.value ? String(resource.value) : "1",
        };
      }
    })
  );

  try {
    const newRoom = await prisma.room.create({
      data: {
        name,
        capacity,
        roomResources: {
          create: roomResources,
        },
      },
      include: {
        roomResources: {
          include: {
            resource: true,
          },
        },
      },
    });
    return Response.json(newRoom, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Error creating room' }, { status: 500 });
  }
}
