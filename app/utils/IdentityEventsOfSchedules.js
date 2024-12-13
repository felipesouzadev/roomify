export default async function IdentifyEventsOfSchedules(schedules, start, end) {
    const shiftTimeMapping = {
        MORNING: { startHour: 8, endHour: 12 },
        AFTERNOON: { startHour: 13, endHour: 17 },
        NIGHT: { startHour: 18, endHour: 22 },
      };

    const events = [];
    for (const schedule of schedules) {
        const scheduleWeekday = schedule.weekday;
        const shiftTimes = shiftTimeMapping[schedule.shift];

        let currentDate = new Date(start);
        while (currentDate <= end && currentDate <= schedule.endDate) {
          if (scheduleWeekday.includes(currentDate.getDay())) {
            const eventStart = new Date(currentDate);
            eventStart.setHours(shiftTimes.startHour, 0, 0, 0);
  
            const eventEnd = new Date(currentDate);
            eventEnd.setHours(shiftTimes.endHour, 0, 0, 0);
  
            const title = `${schedule.teacher.name} - ${schedule.room.name}`;
  
            events.push({
              id: `room${schedule.room.id}-teacher${schedule.teacher.id}-weekday${currentDate.getDay()}-shift${schedule.shift}`,
              title,
              start: eventStart,
              end: eventEnd,
              allDay: false,
            });
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
      return events;
}