function formatDate(date) {
  const dateObj = new Date(date);
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return dateObj.toLocaleDateString(undefined, options);
}

export default formatDate;
