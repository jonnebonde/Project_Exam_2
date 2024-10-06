import { base_Url } from "../../Constants/API";
import { globalStates } from "../../Hooks/GlobalStates";
import useFetchDataAuth from "../../Hooks/Api/Get/Auth/GET";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import HeadLine from "../../Components/HeroSection/Headline";
import UserInfo from "../../Components/user/UserInfo";

function UserPage() {
  const user = globalStates((state) => state.user);

  const { isPending, error, data } = useFetchDataAuth(
    `${base_Url}holidaze/profiles/${user.name}?_bookings=true&_owner=true`,
    "userData"
  );

  console.log(data, isPending, error);

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <Row xs={1} lg={2} className="my-5">
        <Col className="text-center">
          <HeadLine level={1} text="My Profile" />
          <Image
            src={user.avatar.url}
            alt={user.avatar.alt}
            fluid
            style={{
              width: "200px",
              maxHeight: "200px",
              height: "auto",
              objectFit: "cover",
            }}
          />
          <UserInfo user={user} />

          <Button className="mt-3">Edit Profile</Button>
        </Col>
        <Col className="text-center">
          <h1>Bookings</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
