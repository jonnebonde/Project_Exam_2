import { useState } from "react";
import { base_Url } from "../../Constants/API";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import UserInfo from "../../Components/user/UserInfo";
import EditUserFormModal from "../../Components/user/EditUserForm";
import useGetDataAuth from "../../Hooks/Api/Auth/Get";
import { useParams } from "react-router-dom";
import BookingCards from "../../Components/user/BookingCards";
import HeadLine from "../../Components/HeroSection/Headline";
import { Helmet } from "react-helmet-async";
import useMutationDataAuth from "../../Hooks/Api/Auth/PostPutDelete";
import ConfirmModal from "../../Components/Shared/ConfirmModal";
import Loader from "../../Components/Shared/Loader";
import dayjs from "dayjs";

function UserPage() {
  const { name } = useParams();
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [key, setKey] = useState("upcoming");

  const {
    isPending,
    error,
    data: userData,
  } = useGetDataAuth(
    `${base_Url}holidaze/profiles/${name}?_bookings=true&_venues=true`,
    "userData"
  );

  const deleteUserBooking = useMutationDataAuth(
    `${base_Url}holidaze/bookings/${bookingId}`,
    "DELETE"
  );

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

  function handleDeleteBooking(bookingId) {
    setShowConfirmModal(true);
    setBookingId(bookingId);
  }

  function handleConfirm() {
    deleteUserBooking.mutate(null, {
      onSuccess: () => {
        setShowConfirmModal(false);
      },
      onError: () => {
        setShowConfirmModal(false);
      },
    });
  }

  function handleCancel() {
    setShowConfirmModal(false);
  }

  // Filter bookings into upcoming and past
  const today = dayjs().startOf("day");

  const upcomingBookings = userData?.data.bookings.filter((booking) =>
    dayjs(booking.dateFrom).isSameOrAfter(today)
  );

  const sortedUpcomingBookings = [...upcomingBookings].sort((a, b) => {
    const dateA = dayjs(a.dateFrom);
    const dateB = dayjs(b.dateFrom);
    return dateA.isBefore(dateB) ? -1 : 1;
  });

  const pastBookings = userData?.data.bookings.filter((booking) =>
    dayjs(booking.dateFrom).isBefore(today)
  );

  const sortedPastBookings = [...pastBookings].sort((a, b) => {
    const dateA = dayjs(a.dateFrom);
    const dateB = dayjs(b.dateFrom);
    return dateA.isAfter(dateB) ? -1 : 1;
  });

  return (
    <Container>
      <Helmet>
        <title>My Profile | Holidaze</title>
        <meta
          name="description"
          content="Manage your profile, view bookings, and customize preferences."
        />
      </Helmet>
      <Row>
        <Col className="text-center">
          <UserInfo
            user={userData?.data}
            showEditUserModal={showEditUserModal}
          />
          <Button onClick={() => setShowEditUserModal(true)}>
            Edit Profile
          </Button>
        </Col>
      </Row>
      <HeadLine level={3} text="My Bookings" className="text-center mt-3" />
      <Tabs
        id="bookings-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mt-3"
      >
        <Tab eventKey="upcoming" title="Upcoming Bookings">
          {upcomingBookings && upcomingBookings.length > 0 ? (
            <BookingCards
              booking={sortedUpcomingBookings}
              handleDelete={handleDeleteBooking}
            />
          ) : (
            <HeadLine
              level={4}
              text="No upcoming bookings found"
              className="text-center mt-3"
            />
          )}
        </Tab>
        <Tab eventKey="past" title="Past Bookings">
          {pastBookings && pastBookings.length > 0 ? (
            <BookingCards
              booking={sortedPastBookings}
              handleDelete={handleDeleteBooking}
            />
          ) : (
            <HeadLine
              level={4}
              text="No past bookings found"
              className="text-center mt-3"
            />
          )}
        </Tab>
      </Tabs>

      <EditUserFormModal
        user={userData?.data}
        showModal={showEditUserModal}
        setShowModal={setShowEditUserModal}
      />
      <ConfirmModal
        show={showConfirmModal}
        onHide={handleCancel}
        onConfirm={handleConfirm}
        message="Are you sure you want to delete this booking?"
      />
    </Container>
  );
}

export default UserPage;
