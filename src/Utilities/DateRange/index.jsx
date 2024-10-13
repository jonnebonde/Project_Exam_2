function calculateDaysBetween(date1, date2) {
  // Convert both dates to milliseconds
  const date1Millis = new Date(date1).getTime();
  const date2Millis = new Date(date2).getTime();

  // Calculate the difference in milliseconds
  const differenceMillis = Math.abs(date2Millis - date1Millis);

  // Convert back to days
  const differenceDays = Math.ceil(differenceMillis / (1000 * 60 * 60 * 24));

  return differenceDays;
}

export default calculateDaysBetween;
