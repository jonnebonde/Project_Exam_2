import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-multi-date-picker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "react-multi-date-picker/styles/colors/teal.css";
import opacity from "react-element-popper/animations/opacity";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// Dealing with dates is the most frustrating thing i have done in code ever.
// I ended up getting alot of help from chatGPT and the docs for dayjs and datepicker but i learned alot still.
// https://www.npmjs.com/package/react-datepicker
// https://www.npmjs.com/package/dayjs

function VenueBookingPicker({
  bookedDates,
  onDateChange,
  value,
  onValidityChange,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [checkIn, setCheckIn] = useState(value[0] ? dayjs(value[0]) : null);
  const [checkOut, setCheckOut] = useState(value[1] ? dayjs(value[1]) : null);
  const [isValidDateRange, setIsValidDateRange] = useState(true);

  useEffect(() => {
    setCheckIn(value[0] ? dayjs(value[0]) : null);
    setCheckOut(value[1] ? dayjs(value[1]) : null);
    onValidityChange(isValidDateRange);
  }, [value, isValidDateRange, onValidityChange]);

  const isBooked = (date) => {
    return bookedDates.some(({ dateFrom, dateTo }) => {
      const from = dayjs(dateFrom);
      const to = dayjs(dateTo);
      return dayjs(date).isBetween(from, to, null, "[]");
    });
  };

  const isRangeBooked = (start, end) => {
    return bookedDates.some(({ dateFrom, dateTo }) => {
      const from = dayjs(dateFrom);
      const to = dayjs(dateTo);
      return (
        (start.isBefore(to) && end.isAfter(from)) ||
        (start.isSameOrBefore(to) && end.isSameOrAfter(from))
      );
    });
  };

  const handleCheckInChange = (date) => {
    const selectedCheckIn = dayjs(date);
    setCheckIn(selectedCheckIn);
    setErrorMessage("");

    const newCheckOut = selectedCheckIn.add(1, "day");

    if (isRangeBooked(selectedCheckIn, newCheckOut)) {
      setErrorMessage("Selected dates are within booked dates.");
      setCheckOut(null);
      setIsValidDateRange(false);
    } else {
      setCheckOut(newCheckOut);
      onDateChange([selectedCheckIn, newCheckOut]);
      setIsValidDateRange(true);
    }
    onValidityChange(isValidDateRange);
  };

  const handleCheckOutChange = (date) => {
    const selectedCheckOut = dayjs(date);
    setCheckOut(selectedCheckOut);
    setErrorMessage("");

    if (checkIn?.isSameOrAfter(selectedCheckOut)) {
      setErrorMessage("Checkout date must be after check-in date.");
      setIsValidDateRange(false);
    } else if (isRangeBooked(checkIn, selectedCheckOut)) {
      setErrorMessage("Selected checkout date is within booked dates.");
      setIsValidDateRange(false);
    } else {
      onDateChange([checkIn, selectedCheckOut]);
      setIsValidDateRange(true);
    }
    onValidityChange(isValidDateRange);
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
        animations={[opacity()]}
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
        animations={[opacity()]}
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
  ).isRequired,
  onDateChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  onValidityChange: PropTypes.func.isRequired,
};

export default VenueBookingPicker;
