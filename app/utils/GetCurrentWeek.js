export default function GetCurrentWeek(currentDate) {
    const now = new Date();

  const weekday = now.getDay();

  const diffToSunday = weekday;

  // Calculate the difference to Friday
  const diffToFriday = (weekday <= 5) ? 5 - weekday : 5 + (7 - weekday);

  // Get the Sunday date (set hours to 00:00:00 for consistency)
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - diffToSunday);
  sunday.setHours(0, 0, 0, 0);

  // Get the Friday date (set hours to 23:59:59 for consistency)
  const friday = new Date(now);
  friday.setDate(now.getDate() + diffToFriday);
  friday.setHours(23, 59, 59, 999);

  return { sunday: sunday.toISOString().split('T')[0], friday: friday.toISOString().split('T')[0] };
}
