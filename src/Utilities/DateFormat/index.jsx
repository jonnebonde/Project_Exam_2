import dayjs from "dayjs";

function formatDate(date) {
  const dateObj = dayjs(date);
  if (!dateObj.isValid()) {
    throw new Error("Invalid date provided.");
  }
  return dateObj.format("DD.MM.YYYY");
}

export default formatDate;
