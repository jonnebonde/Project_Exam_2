import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-multi-date-picker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "react-multi-date-picker/styles/colors/teal.css";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// Dealing with dates is the most frustrating thing i have done in code ever so
// I ended up getting alot of help from chatGPT and the docs for dayjs and datepicker but i learned alot still.
// https://www.npmjs.com/package/react-datepicker
// https://www.npmjs.com/package/dayjs

function VenueBookingPicker({ bookedDates, onDateChange, value }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [checkIn, setCheckIn] = useState(value[0] ? dayjs(value[0]) : null);
  const [checkOut, setCheckOut] = useState(value[1] ? dayjs(value[1]) : null);

  useEffect(() => {
    setCheckIn(value[0] ? dayjs(value[0]) : null);
    setCheckOut(value[1] ? dayjs(value[1]) : null);
  }, [value]);

  const isBooked = (date) => {
    return bookedDates.some(({ dateFrom, dateTo }) => {
      const from = dayjs(dateFrom);
      const to = dayjs(dateTo);
      return dayjs(date).isBetween(from, to, null, "[]");
    });
  };

  const handleCheckInChange = (date) => {
    const selectedCheckIn = dayjs(date);
    setCheckIn(selectedCheckIn);
    setErrorMessage("");

    const newCheckOut = selectedCheckIn.add(1, "day");
    if (isBooked(newCheckOut)) {
      setErrorMessage("Checkout date cannot be within booked dates.");
      setCheckOut(null);
    } else {
      setCheckOut(newCheckOut);
      onDateChange([selectedCheckIn, newCheckOut]);
    }
  };

  const handleCheckOutChange = (date) => {
    const selectedCheckOut = dayjs(date);
    setCheckOut(selectedCheckOut);
    setErrorMessage("");

    if (checkIn && checkIn.isSameOrAfter(selectedCheckOut)) {
      setErrorMessage("Checkout date must be after check-in date.");
    } else if (isBooked(selectedCheckOut)) {
      setErrorMessage("Selected checkout date is within booked dates.");
    } else {
      onDateChange([checkIn, selectedCheckOut]);
    }
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
            props.style = {
              color: "rgba(232, 76, 60, 1)",
              textDecoration: "line-through",
            };
          }
          return props;
        }}
        style={{ width: "100%", margin: "0 auto" }}
        format="DD/MM/YYYY"
        placeholder="Check-in date"
        minDate={dayjs().toDate()}
        highlightToday={true}
      />

      <DatePicker
        value={checkOut ? checkOut.toDate() : null}
        onChange={handleCheckOutChange}
        mobile={true}
        mapDays={({ date }) => {
          let props = {};
          if (
            isBooked(date) ||
            (checkIn && dayjs(date).isSameOrBefore(checkIn))
          ) {
            props.disabled = true;
            props.style = {
              color: "rgba(232, 76, 60, 1)",
              textDecoration: "line-through",
            };
          }
          return props;
        }}
        style={{ width: "100%", margin: "0 auto", marginTop: "10px" }}
        format="DD/MM/YYYY"
        placeholder="Check-out date"
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
