import { useState } from "react";
import { base_Url } from "../../Constants/API";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserInfo from "../../Components/user/UserInfo";
import EditUserFormModal from "../../Components/user/EditUserForm";
import useGetDataAuth from "../../Hooks/Api/Auth/Get";
import { useParams } from "react-router-dom";
import BookingCards from "../../Components/User/BookingCards";
import HeadLine from "../../Components/HeroSection/Headline";
import { Helmet } from "react-helmet-async";

function UserPage() {
  const { name } = useParams();

  const {
    isPending,
    error,
    data: userData,
  } = useGetDataAuth(
    `${base_Url}holidaze/profiles/${name}?_bookings=true&_venues=true`,
    "userData"
  );

  const [showEditUserModal, setShowEditUserModal] = useState(false);

  if (isPending) {
    return <Container className="text-center">Loading...</Container>;
  }

  if (error) {
    return (
      <Container className="text-center">
        Something went wrong, please try again
      </Container>
    );
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
        <BookingCards booking={userData?.data.bookings} />
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
    </Container>
  );
}

export default UserPage;
