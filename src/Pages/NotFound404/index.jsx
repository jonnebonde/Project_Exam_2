import { Link } from "react-router-dom";
import { Container, Image, Button } from "react-bootstrap";
import Notfound from "../../assets/Images/404.jpg";
import HeadLine from "../../Components/HeroSection/Headline";
const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <HeadLine level={1} text="Oops! Where are you off to?" />
      <Image
        src={Notfound}
        alt="Lost in the tropics"
        className="fluid w-75 rounded-1 mb-3"
      />
      <p className="fs-5">
        It seems like you’ve found a LOST venue on your way to paradise!
      </p>
      <p>
        Don’t worry, our exotic venues are still waiting for you! Maybe try
        booking a tropical island or a treehouse in the rainforest?
      </p>
      <Button as={Link} to="/" size="lg" className="mb-3">
        Return to Holidaze
      </Button>
      <p className="fs-5">
        If you keep getting lost, we can get you a tour guide!
      </p>
    </Container>
  );
};

export default NotFound;
