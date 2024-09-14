import { useCallback } from "react";
import { Card } from "react-bootstrap";
import { SearchEntity } from "../../api";
import styles from "./styles.module.css";

type Props = {
  data: SearchEntity;
  onClick?: (id: string) => void;
};

export function ListItem({ data, onClick }: Props) {
  const onCardClick = useCallback(
    () => onClick?.(data.imdbID),
    [data.imdbID, onClick]
  );

  return (
    <Card
      style={{ width: "100%", height: "100%" }}
      onClick={onCardClick}
      className={styles.ListItem}
    >
      <Card.Img variant="top" src={data.Poster} />

      <Card.Body>
        <Card.Title>{data.Title}</Card.Title>
        <Card.Text>
          <span className="text-secondary">{data.Year}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
