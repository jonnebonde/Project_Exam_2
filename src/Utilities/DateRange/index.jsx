import dayjs from "dayjs";

function calculateDaysBetween(date1, date2) {
  const startDate = dayjs(date1);
  const endDate = dayjs(date2);
  const differenceBetweenDays = Math.abs(endDate.diff(startDate, "day", true));
  const differenceBetweenDaysRoundUp = Math.ceil(differenceBetweenDays);

  return differenceBetweenDaysRoundUp;
}

export default calculateDaysBetween;
