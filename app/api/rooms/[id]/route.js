import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req, {params}) {
    const { id } = await params;

    if (!id) {
        return Response.json({ error: 'ID is required' }, { status: 400 });
      }

      try {
        const deletedRoom = await prisma.room.delete({
          where: { id: parseInt(id) },
        });
        return Response.json(deletedRoom, {status: 200});

      } catch (error) {
        if (error.code === 'P2025') { 
          return Response.json({ error: 'Resource not found' }, { status: 404 });
        }
    
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}

export async function PUT(req, {params}) {
  const { id } = await params;

    if (!id) {
        return Response.json({ error: 'ID is required' }, { status: 400 });
      }
  const { name, capacity, resources } = await req.json();
  try {
    const updatedRoom = await prisma.room.update({
      where: { id: parseInt(id) },
      data: { name, capacity} 
    })

    await prisma.roomResource.deleteMany({
      where: {
        roomId: parseInt(id)
      },
    });

    const roomResources = await Promise.all(
      resources.map(async (resource) => {
        if (resource.id) {
          return {
              roomId: parseInt(id),
              resourceId:  resource.id,
              value: resource.value ? String(resource.value) : "1",
          }
        } else {
          const existingResource = await prisma.resource.findFirst({  where: { name: resource.name } });
          if (existingResource) {
            return {
                roomId: parseInt(id),
                resourceId: existingResource.id,
                value: resource.value ? String(resource.value) : "1"
            };
          }
          const createdResource = await prisma.resource.create({
            data: { name: resource.name, type: resource.type },
          });
          return {
              roomId: parseInt(id),
              resourceId: createdResource.id,
              value: resource.value ? String(resource.value) : "1",
          };
        }
      })
    );
    
    await prisma.roomResource.createMany({data: roomResources});

    const finalRoom = await prisma.room.findUnique({
      where: { id: parseInt(id) },
      include: {
        roomResources: {
          include: {
            resource: true, 
          },
        },
      },
    });
      
    return Response.json(finalRoom, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error updating room' }, { status: 500 });
  }
}