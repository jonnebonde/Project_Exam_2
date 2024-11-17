import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { base_Url } from "../../Constants/API";
import { useParams, useNavigate } from "react-router-dom";
import useFetchData from "../../Hooks/Api/NoAuth/Get";
import HeadLine from "../../Components/HeroSection/Headline";
import { useState, useEffect, useRef } from "react";
import { UserDataStore } from "../../Hooks/GlobalStates/UserData";
import VenueDetails from "../../Components/SpecificVenue/VenueDetails";
import VenueBookingForm from "../../Components/SpecificVenue/VenueBookingForm";
import VenueConfirmationModal from "../../Components/SpecificVenue/BookingModal";
import ImageSlider from "../../Components/SpecificVenue/ImageSlider";
import { Helmet } from "react-helmet-async";
import VenueAvailabilityCalendar from "../../Components/SpecificVenue/AvailabilityCalendar";
import VenueMap from "../../Components/SpecificVenue/VenueMap";
import Loader from "../../Components/Shared/Loader";
import dayjs from "dayjs";
import UpcomingBookingToast from "../../Components/SpecificVenue/BookingToast";

function VenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = UserDataStore((state) => state.user);
  const accessToken = user?.accessToken;

  const url = `${base_Url}holidaze/venues/${id}?_owner=true&_bookings=true`;
  const { isPending, error, data: venue } = useFetchData(url, id);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [guests, setGuests] = useState(0);
  const [showBookingToast, setShowBookingToast] = useState(false);
  const [upComingBooking, setUpComingBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const hasShownBookingToast = useRef(false);

  useEffect(() => {
    const delayToastMessage = setTimeout(() => {
      if (!hasShownBookingToast.current && venue?.data?.bookings && user) {
        const today = dayjs().startOf("day");
        const userBookings = venue?.data?.bookings.filter((booking) => {
          const hasUserBooked = booking.customer.name === user.name;
          const hasUserUpcoming = dayjs(booking.dateFrom).isSameOrAfter(today);
          return hasUserBooked && hasUserUpcoming;
        });

        if (userBookings.length > 0) {
          setUpComingBooking(userBookings[0]);
          setShowBookingToast(true);
          hasShownBookingToast.current = true;
        }
      }
    }, 2000);

    return () => clearTimeout(delayToastMessage);
  }, [venue, user]);

  const handleGuestChange = (e) => {
    const guestCount = parseInt(e.target.value);
    setGuests(isNaN(guestCount) ? 0 : guestCount);
  };

  const handleReserveClick = () => {
    if (selectedDates[0] && selectedDates[1]) {
      setShowModal(true);
    }
  };

  const resetBookingForm = () => {
    setSelectedDates([null, null]);
    setGuests(0);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (isPending) {
    return (
      <Container className="text-center">
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center">
        Something went wrong, please try again
      </Container>
    );
  }

  let bookingSection;

  if (!accessToken) {
    bookingSection = (
      <Alert variant="warning" className="text-center">
        You must{" "}
        <Button variant="link" onClick={() => navigate("/login")}>
          login
        </Button>{" "}
        or{" "}
        <Button variant="link" onClick={() => navigate("/register")}>
          register
        </Button>{" "}
        to book this venue.
      </Alert>
    );
  } else if (user.name === venue.data.owner.name) {
    bookingSection = (
      <Alert variant="warning" className="text-center">
        You are the owner of this venue and cannot book it.
      </Alert>
    );
  } else {
    bookingSection = (
      <VenueBookingForm
        venue={venue.data}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        guests={guests}
        handleGuestChange={handleGuestChange}
        onReserveClick={handleReserveClick}
      />
    );
  }

  return (
    <Container>
      <Helmet>
        <title>{venue?.data?.name || "Venue"} | Holidaze</title>
        <meta
          name="description"
          content="Explore this unique venue, complete with detailed amenities, photos, and booking options. Perfect for your next event, whether big or small."
        />
      </Helmet>
      <Row>
        <Col>
          <HeadLine
            level={1}
            className="text-black fw-semibold text-center mt-5 mb-4"
            text={venue?.data?.name}
          />
        </Col>
      </Row>
      <Row xs={1} sm={1} md={1} lg={2}>
        <Col className="venue-image-container">
          <ImageSlider images={venue?.data?.media} />
        </Col>
        <Col className="mt-lg-0 mt-3 d-lg-flex flex-column justify-content-between">
          <VenueDetails venue={venue} />
          {bookingSection}
        </Col>
      </Row>
      <Row xs={1} sm={1} md={1} lg={2} className="my-5 flex-row-reverse ">
        <Col className="availability-calendar-container">
          <HeadLine
            level={5}
            className="fw-semibold text-center"
            text="Availability"
          />
          <VenueAvailabilityCalendar bookedDates={venue?.data?.bookings} />
        </Col>
        <Col className="mt-3">
          <HeadLine level={5} className="text-black fw-semibold" text="Owner" />
          <p className="ms-3">Name: {venue?.data?.owner?.name}</p>
          <p className="ms-3">Email: {venue?.data?.owner?.email}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <VenueMap
            latitude={venue?.data?.location?.lat || 26.357896}
            longitude={venue?.data?.location?.lng || 127.783809}
          />
        </Col>
      </Row>

      {accessToken && (
        <VenueConfirmationModal
          showModal={showModal}
          handleCancel={handleCancel}
          selectedDates={selectedDates}
          guests={guests}
          data={venue}
          resetBookingForm={resetBookingForm}
          user={user}
        />
      )}
      {upComingBooking && (
        <UpcomingBookingToast
          show={showBookingToast}
          onClose={() => setShowBookingToast(false)}
          booking={upComingBooking}
        />
      )}
    </Container>
  );
}

export default VenuePage;
