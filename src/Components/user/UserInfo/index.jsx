import { ListGroup, ListGroupItem } from "react-bootstrap";
import HeadLine from "../../../Components/HeroSection/Headline";

function UserInfo(user) {
  return (
    <ListGroup className="text-start mt-3 m-auto">
      <ListGroupItem>
        <HeadLine level={5} text={`Name: ${user?.user.name}`} />
      </ListGroupItem>
      <ListGroupItem>
        <HeadLine level={5} text={`Email: ${user?.user.email}`} />
      </ListGroupItem>
      <ListGroupItem>
        <HeadLine
          level={5}
          text={`Bio: ${user?.user.bio ? user.user.bio : "No bio provided"}`}
        />
      </ListGroupItem>
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
