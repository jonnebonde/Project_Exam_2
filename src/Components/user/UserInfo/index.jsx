import { ListGroup, ListGroupItem } from "react-bootstrap";
import HeadLine from "../../../Components/HeroSection/Headline";

function UserInfo(user) {
  return (
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
  );
}

export default UserInfo;
