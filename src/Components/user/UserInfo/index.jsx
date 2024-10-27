import { ListGroup, ListGroupItem, Image } from "react-bootstrap";
import HeadLine from "../../../Components/HeroSection/Headline";

function UserInfo(user) {
  return (
    <>
      <HeadLine level={1} text="My Profile" />
      <Image
        src={user?.user.avatar?.url || "https://via.placeholder.com/150"}
        alt={user?.user.avatar?.alt || "no alt text provided im afraid"}
        fluid
        className="d-block w-100 rounded-1"
        style={{
          maxHeight: "200px",
          objectFit: "cover",
        }}
      />
      <ListGroup className=" mt-2 m-auto user-info-container text-wrap">
        <ListGroupItem>
          <HeadLine level={5} text={`Name: ${user?.user.name}`} />
        </ListGroupItem>
        <ListGroupItem></ListGroupItem>
        {user?.user.venueManager ? (
          <ListGroupItem>
            <HeadLine level={5} text="Im a venue manager" />
          </ListGroupItem>
        ) : (
          ""
        )}
      </ListGroup>
    </>
  );
}

export default UserInfo;
