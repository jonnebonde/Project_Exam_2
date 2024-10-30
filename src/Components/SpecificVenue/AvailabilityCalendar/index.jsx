import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";

import PropTypes from "prop-types";

function VenueAvailabilityCalendar({ bookedDates }) {
  const isBooked = (date) => {
    return bookedDates.some(({ dateFrom, dateTo }) => {
      const from = dayjs(dateFrom);
      const to = dayjs(dateTo);
      return dayjs(date).isBetween(from, to, null, "[]");
    });
  };

  const tileClassName = ({ date }) => {
    return isBooked(date) ? "booked-date" : "available-date";
  };

  return (
    <Calendar
      tileDisabled={() => true}
      tileClassName={tileClassName}
      prev2Label={null}
      next2Label={null}
    />
  );
}

VenueAvailabilityCalendar.propTypes = {
  bookedDates: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    })
  ),
};

export default VenueAvailabilityCalendar;
