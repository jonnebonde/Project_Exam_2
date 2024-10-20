import { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-multi-date-picker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "react-multi-date-picker/styles/colors/teal.css";

dayjs.extend(isBetween);

// Dealing with dates is the most frustrating thing i have done in code ever so
// I ended up getting alot of help from chatGPT and the docs for dayjs and datepicker

function VenueBookingPicker({ bookedDates, onDateChange, value }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [checkIn, setCheckIn] = useState(value[0] ? dayjs(value[0]) : null);
  const [checkOut, setCheckOut] = useState(value[1] ? dayjs(value[1]) : null);

  const isBooked = (date) => {
    return bookedDates.some(({ dateFrom, dateTo }) => {
      const from = dayjs(dateFrom);
      const to = dayjs(dateTo);
      return dayjs(date).isBetween(from, to, null, "[]");
    });
  };

  const isRangeBooked = (startDate, endDate) => {
    let currentDate = dayjs(startDate).add(1, "day");
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      if (isBooked(currentDate)) {
        return true;
      }
      currentDate = currentDate.add(1, "day");
    }
    return false;
  };

  // Handle check-in date change
  const handleCheckInChange = (date) => {
    const selectedCheckIn = dayjs(date);
    setCheckIn(selectedCheckIn);
    setErrorMessage("");

    if (
      checkOut &&
      (isRangeBooked(selectedCheckIn, checkOut) ||
        selectedCheckIn.isSame(checkOut))
    ) {
      setErrorMessage(
        "You cannot select the same date for check-in and check-out or a range that includes booked dates."
      );
      return;
    }

    onDateChange([selectedCheckIn, checkOut]);
  };

  // Handle check-out date change
  const handleCheckOutChange = (date) => {
    const selectedCheckOut = dayjs(date);
    setCheckOut(selectedCheckOut);
    setErrorMessage("");

    if (
      checkIn &&
      (isRangeBooked(checkIn, selectedCheckOut) ||
        checkIn.isSame(selectedCheckOut))
    ) {
      setErrorMessage(
        "You cannot select the same date for check-in and check-out or a range that includes booked dates."
      );
      return;
    }

    onDateChange([checkIn, selectedCheckOut]);
  };

  return (
    <>
      <DatePicker
        value={checkIn ? checkIn.toDate() : null}
        onChange={handleCheckInChange}
        mobile={true}
        mapDays={({ date }) => {
          let props = {};
          if (isBooked(date)) {
            props.disabled = true;
            props.style = { color: "#ccc", textDecoration: "line-through" };
          }
          return props;
        }}
        style={{ width: "100%", margin: "0 auto" }}
        format="DD/MM/YYYY"
        placeholder="Select check-in date"
        minDate={dayjs().toDate()}
        highlightToday={true}
      />

      <DatePicker
        value={checkOut ? checkOut.toDate() : null}
        onChange={handleCheckOutChange}
        mobile={true}
        mapDays={({ date }) => {
          let props = {};
          if (isBooked(date)) {
            props.disabled = true;
            props.style = { color: "#ccc", textDecoration: "line-through" };
          }
          return props;
        }}
        style={{ width: "100%", margin: "0 auto", marginTop: "10px" }}
        format="DD/MM/YYYY"
        placeholder="Select check-out date"
        minDate={checkIn ? checkIn.add(1, "day").toDate() : dayjs().toDate()}
        highlightToday={true}
      />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}

VenueBookingPicker.propTypes = {
  bookedDates: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    })
  ),
  onDateChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
};

export default VenueBookingPicker;
