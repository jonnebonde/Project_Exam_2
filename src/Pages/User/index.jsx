import { useState } from "react";
import { base_Url } from "../../Constants/API";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import HeadLine from "../../Components/HeroSection/Headline";
import UserInfo from "../../Components/user/UserInfo";
import EditUserForm from "../../Components/user/EditUserForm";
import useGetDataAuth from "../../Hooks/Api/Auth/Get";
import { useParams } from "react-router-dom";

function UserPage() {
  const { name } = useParams();

  console.log(name);

  const {
    isPending,
    error,
    data: userData,
  } = useGetDataAuth(
    `${base_Url}holidaze/profiles/${name}?_bookings=true&_owner=true`,
    "userData"
  );

  const [showModal, setShowModal] = useState(false);

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <Row xs={1} lg={2}>
        <Col className="text-center my-5">
          <HeadLine level={1} text="My Profile" />
          <Image
            src={
              userData?.data.avatar?.url || "https://via.placeholder.com/150"
            }
            alt={
              userData?.data.avatar?.alt || "Placeholder image for user avatar"
            }
            fluid
            style={{
              width: "200px",
              maxHeight: "200px",
              height: "auto",
              objectFit: "cover",
            }}
          />
          <UserInfo user={userData?.data} />
          <Button className="mt-3" onClick={() => setShowModal(true)}>
            Edit Profile
          </Button>
        </Col>
        <Col className="text-center my">
          <HeadLine level={1} text="My Bookings" />
        </Col>
      </Row>
      <EditUserForm
        user={userData?.data}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Container>
  );
}

export default UserPage;
