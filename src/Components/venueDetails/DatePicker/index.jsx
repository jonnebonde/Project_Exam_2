import { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-multi-date-picker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "react-multi-date-picker/styles/colors/teal.css"; // Import required styles

// Extend dayjs with the isBetween plugin
dayjs.extend(isBetween);

function VenueBookingPicker({ bookedDates }) {
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [errorMessage, setErrorMessage] = useState(""); // For error message

  // Helper function to check if a date is within the booked range
  const isBooked = (date) => {
    return bookedDates.some(({ dateFrom, dateTo }) => {
      const from = dayjs(dateFrom);
      const to = dayjs(dateTo);
      return dayjs(date).isBetween(from, to, null, "[]");
    });
  };

  // Helper function to check if any date in the range is booked
  const isRangeBooked = (startDate, endDate) => {
    let currentDate = dayjs(startDate);
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      if (isBooked(currentDate)) {
        return true;
      }
      currentDate = currentDate.add(1, "day");
    }
    return false;
  };

  // Handle date selection
  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;

    if (startDate && endDate) {
      // Check if any date in the selected range is booked
      if (isRangeBooked(startDate, endDate)) {
        setErrorMessage(
          "You cannot select a range that includes booked dates."
        );
        setSelectedDates([null, null]); // Reset the selection
      } else {
        setErrorMessage(""); // Clear the error
        setSelectedDates(dates); // Accept the selection
      }
    } else {
      setSelectedDates(dates); // If no range is selected, just set the selected dates
    }
  };

  console.log(selectedDates);

  return (
    <>
      <DatePicker
        value={selectedDates}
        onChange={handleDateChange} // Custom date change handler
        range // Enable range selection
        mobile={true} // Mobile-friendly
        mapDays={({ date }) => {
          let props = {};
          if (isBooked(date)) {
            props.disabled = true; // Disable the booked date
            props.style = { color: "#ccc", textDecoration: "line-through" }; // Optional: Style the disabled date
          }
          return props;
        }}
        style={{ width: "100%", margin: "0 auto" }} // Custom width for the date picker
        format="YYYY/MM/DD" // Custom date format
        placeholder="Select booking range" // Placeholder text
        minDate={dayjs()} // Set the minimum date to today
      />

      {/* Display error message if any */}
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
};

export default VenueBookingPicker;
