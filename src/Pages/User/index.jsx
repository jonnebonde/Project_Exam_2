import { useState } from "react";
import { base_Url } from "../../Constants/API";
import { Container, Row, Col, Button } from "react-bootstrap";
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

function UserPage() {
  const { name } = useParams();
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    setShowConfirmModal(false);
  }

  function handleCancel() {
    setShowConfirmModal(false);
  }

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
      {userData?.data.bookings && userData?.data.bookings.length > 0 ? (
        <BookingCards
          booking={userData?.data.bookings}
          handleDelete={handleDeleteBooking}
        />
      ) : (
        <HeadLine
          level={4}
          text="No bookings found"
          className="text-center mt-3"
        />
      )}
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
