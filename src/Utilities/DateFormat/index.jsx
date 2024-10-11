function formatDate(date) {
  const dateObj = new Date(date);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return dateObj.toLocaleDateString(undefined, options);
}

export default formatDate;
