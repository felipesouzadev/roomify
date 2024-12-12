import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req, {params}) {
    const { id } = await params;

    if (!id) {
        return Response.json({ error: 'ID is required' }, { status: 400 });
      }

      try {
        const deletedTeacher = await prisma.teacher.delete({
          where: { id: parseInt(id) },
        });
        return Response.json(deletedTeacher, {status: 200});

      } catch (error) {
        console.error('Error deleting teacher:', error);
        if (error.code === 'P2025') { 
          return Response.json({ error: 'Teacher not found' }, { status: 404 });
        }
    
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }

export async function PUT(req, {params}) {
  const { id } = await params;
  const { name, subject, contact } = await req.json();

  if (!id) {
      return Response.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
      const updatedTeacher = await prisma.teacher.update({
        where: { id: parseInt(id) },
        data: { name, subject, contact },
      });

      return Response.json(updatedTeacher, {status: 200});
    } catch (error) {
      console.error('Error deleting teacher:', error);
      if (error.code === 'P2025') { 
        return Response.json({ error: 'Teacher not found' }, { status: 404 });
      }
  
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }