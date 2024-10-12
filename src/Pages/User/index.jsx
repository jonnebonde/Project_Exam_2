import { useState } from "react";
import { base_Url } from "../../Constants/API";
import { Container, Row, Col, Image, Button, Tab, Tabs } from "react-bootstrap";
import HeadLine from "../../Components/HeroSection/Headline";
import UserInfo from "../../Components/user/UserInfo";
import EditUserForm from "../../Components/user/EditUserForm";
import useGetDataAuth from "../../Hooks/Api/Auth/Get";
import { useParams } from "react-router-dom";
import BookingCards from "../../Components/user/BookingCards";

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
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  console.log(userData);
  // fortsette sette opp forms for venues

  return (
    <Container>
      <Row>
        <Col className="text-center my-5">
          <HeadLine level={1} text="My Profile" />

          <Image
            src={
              userData?.data.avatar?.url || "https://via.placeholder.com/150"
            }
            alt={userData?.data.avatar?.alt || "no alt text provided im afraid"}
            fluid
            style={{
              width: "150px",
              maxHeight: "150px",
              objectFit: "cover",
            }}
          />
          <UserInfo user={userData?.data} />
          <Button onClick={() => setShowEditUserModal(true)}>
            Edit Profile
          </Button>
        </Col>
      </Row>
      {userData?.data.venueManager && (
        <Row>
          <Col className="text-end">
            <Button className="mb-3">New Venue</Button>
          </Col>
        </Row>
      )}
      <Tabs
        defaultActiveKey="bookings"
        id="justify-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="bookings" title="My Bookings">
          {userData?.data.bookings && userData?.data.bookings.length > 0 ? (
            <BookingCards booking={userData?.data.bookings} />
          ) : (
            <HeadLine
              level={4}
              text="No bookings found"
              className="text-center"
            />
          )}
        </Tab>

        {userData?.data.venueManager && (
          <Tab eventKey="venues" title="My Venues">
            {userData?.data.venues && userData?.data.venues.length > 0 ? (
              <p>venues</p>
            ) : (
              <HeadLine
                level={4}
                text="No venues found"
                className="text-center"
              />
            )}
          </Tab>
        )}
      </Tabs>

      <EditUserForm
        user={userData?.data}
        showModal={showEditUserModal}
        setShowModal={setShowEditUserModal}
      />
    </Container>
  );
}

export default UserPage;
