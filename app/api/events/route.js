import { PrismaClient } from '@prisma/client';
import IdentifyEventsOfSchedules from '../../utils/IdentityEventsOfSchedules';

const prisma = new PrismaClient();


export async function GET(req) {
    try {
        const queryParameters = req.nextUrl.searchParams;
        const startDate = queryParameters.get('startDate');
        const endDate = queryParameters.get('endDate');

        if (!startDate || !endDate) {
            return Response.json(JSON.stringify({ error: 'We need a properly date range to filter.' }), { status: 500 });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const schedules = await prisma.schedule.findMany({
            where: {
            OR: [
                {
                startDate: { lte: start },
                },
                {
                endDate: { gte: end },
                }
            ],
            },
            include: {
                room: true,
                teacher: true
            }
        });

        const events = await IdentifyEventsOfSchedules(schedules, start, end);
        return Response.json(events, { status: 200 });
    } catch (error) {
        return Response.json({ error: 'Error fetching events' }, { status: 500 });
    }
}