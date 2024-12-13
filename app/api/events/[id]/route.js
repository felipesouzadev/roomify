import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const eventIdRegex = /room(\d+)-teacher(\d+)-weekday(\d+)-shift(MORNING|AFTERNOON|NIGHT)/;

export const DELETE = async (req, {params}) => {
    const { id } = await params;

    const idMatch = id.match(eventIdRegex)

    if (!id || !idMatch) {
        return Response.json({ error: 'ID is required' }, { status: 400 });
    }

    try{
        const roomId = idMatch[1];
        const teacherId = idMatch[2];
        const weekday = idMatch[3];
        const shift = idMatch[4];

        const schedule = await prisma.schedule.findFirst({where: {roomId: parseInt(roomId),
                                                      teacherId: parseInt(teacherId),
                                                      weekday: {has: parseInt(weekday)},
                                                      shift}});

        if (!schedule) {
            return Response.json({ error: 'Event not found' }, { status: 404 });
        }

        if (schedule.weekday.length > 0){
            const updatedSchedule = await prisma.schedule.update({
                where: {id: schedule.id},
                data: {weekday: {set: schedule.weekday.filter((day) => day !== parseInt(weekday))}}
            });
            return Response.json(updatedSchedule, { status: 200 });
        } else{
            await prisma.schedule.delete({where: {id: schedule.id}});
            return Response.json({ message: 'Event deleted' }, { status: 200 });
        }

        } catch (error) {
            return Response.json({ error: 'Error deleting event' }, { status: 500 });
        }
}