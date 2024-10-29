import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import PropTypes from "prop-types";
dayjs.extend(isBetween);

function VenueBookingPicker({ bookedDates, onDateChange, value }) {
  const [checkIn, setCheckIn] = useState(value[0] ? dayjs(value[0]) : null);
  const [checkOut, setCheckOut] = useState(value[1] ? dayjs(value[1]) : null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (checkIn) {
      handleCheckOutChange(checkIn.add(1, "day").toDate(), true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn]);

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

  const handleCheckInChange = (date) => {
    const selectedCheckIn = dayjs(date);
    if (isBooked(selectedCheckIn)) {
      // find the first vacant date
      let vacantDate = selectedCheckIn.add(1, "day");
      while (isBooked(vacantDate)) {
        vacantDate = vacantDate.add(1, "day");
      }
      setCheckIn(vacantDate);
    } else {
      setCheckIn(selectedCheckIn);
    }
    setErrorMessage("");
    onDateChange([selectedCheckIn, checkOut]);
    if (
      checkOut &&
      selectedCheckIn.isAfter(checkOut) &&
      checkOut !== selectedCheckIn.add(1, "day")
    ) {
      setErrorMessage("Check-in date cannot be after check-out date.");
      return;
    }

    if (
      checkOut &&
      (isRangeBooked(selectedCheckIn, checkOut) ||
        selectedCheckIn.isSame(checkOut)) &&
      !isBooked(selectedCheckIn)
    ) {
      setErrorMessage(
        "You cannot select the same date for check-in and check-out or a range that includes booked dates."
      );
      return;
    }
  };

  const handleCheckOutChange = (date, isAutoUpdate = false) => {
    const selectedCheckOut = dayjs(date);
    if (isBooked(selectedCheckOut)) {
      setErrorMessage("Selected check-out date is already booked.");
      return;
    }
    if (checkIn && isRangeBooked(checkIn, selectedCheckOut)) {
      setErrorMessage("Selected range contains booked dates.");
      return;
    }
    setCheckOut(selectedCheckOut);
    setErrorMessage("");
    onDateChange([checkIn, selectedCheckOut]);
    if (checkIn && selectedCheckOut.isBefore(checkIn) && !isAutoUpdate) {
      setErrorMessage("Check-out date cannot be before check-in date.");
      return;
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
        placeholder="Check-out date"
        minDate={checkIn ? checkIn.add(1, "day").toDate() : dayjs().toDate()}
        highlightToday={true}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
}

VenueBookingPicker.propTypes = {
  onDateChange: PropTypes.func,
  value: PropTypes.array,
  bookedDates: PropTypes.array,
};

export default VenueBookingPicker;
