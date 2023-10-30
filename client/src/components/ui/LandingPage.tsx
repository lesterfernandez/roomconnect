import Navbar from "./Navbar";
import { Container } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Container minH="100vh" style={{ backgroundColor: "blue" }}>
      <Navbar />
    </Container>
  );
};

export default LandingPage;
