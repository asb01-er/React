import { Container } from "react-bootstrap";
import ModelList from "./components/ModelList";

function Home() {
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Modeling Profiles</h2>
      <ModelList />
    </Container>
  );
}

export default Home;
