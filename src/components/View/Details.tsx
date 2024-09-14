import { Button, Card, ListGroup } from "react-bootstrap";
import { MovieEntity } from "../../api";

type Props = {
  data: MovieEntity;
  onEdit: () => void;
};

export function Details({ data, onEdit }: Props) {
  return (
    <Card>
      <Card.Img variant="top" src={data.Poster} alt="Poster" />

      <Card.Body>
        <Card.Text>{data.Year}</Card.Text>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <span className="text-secondary">{"Genre:"}</span> {data.Genre}
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="text-secondary">{"Director:"}</span> {data.Director}
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="text-secondary">{"Actors:"}</span> {data.Actors}
        </ListGroup.Item>
        <ListGroup.Item>{data.Plot}</ListGroup.Item>
        <ListGroup.Item>
          <span className="mx-3 text-primary">{"Ratings"}</span>
          <ListGroup className="list-group-flush">
            {data.Ratings?.map((v, idx) => (
              <ListGroup.Item key={idx}>
                <span className="text-secondary">{v.Source}</span> {v.Value}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <Button variant="primary" className="m-4" onClick={onEdit}>
        Edit
      </Button>
    </Card>
  );
}
