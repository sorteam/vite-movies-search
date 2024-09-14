import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { List } from "./components/List";

export default function App() {
  return (
    <Container fluid className="py-4 px-3" data-testid="app">
      <Row>
        <Col>
          <List />
        </Col>
      </Row>
    </Container>
  );
}
