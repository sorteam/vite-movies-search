import { useCallback, useState } from "react";
import { Alert, Offcanvas } from "react-bootstrap";
import { MovieEntity, SearchEntity } from "../../api";
import { useMovie } from "../../query";
import { Loader } from "../Loader";
import { Details } from "./Details";
import { EditForm } from "./EditForm";
import styles from "./styles.module.css";

type Props = {
  movie: SearchEntity;
  onClose: () => void;
  onMutate: (movie: MovieEntity) => void;
};

enum Modes {
  VIEW,
  EDIT,
}

export function View({ movie, onClose, onMutate }: Props) {
  const [mode, setMode] = useState(Modes.VIEW);

  const { data, isLoading, error, mutate } = useMovie(movie.imdbID);

  const onEdit = useCallback(() => setMode(Modes.EDIT), []);
  const onView = useCallback(() => setMode(Modes.VIEW), []);

  const onSubmit = useCallback(
    (newData: MovieEntity) => {
      mutate(newData, { revalidate: false }).catch(console.log);
      onMutate(newData);
      onView();
    },
    [mutate, onMutate, onView]
  );

  return (
    <Offcanvas
      show={!!movie}
      onHide={onClose}
      placement="end"
      backdropClassName={styles.Drawer}
      data-testid="drawer"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{movie.Title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {error ? (
          <Alert>{"Something went wrong"}</Alert>
        ) : isLoading ? (
          <div className="mx-4">
            <Loader />
          </div>
        ) : data ? (
          mode === Modes.VIEW ? (
            <Details data={data} onEdit={onEdit} />
          ) : (
            <EditForm data={data} onClose={onView} onSubmit={onSubmit} />
          )
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
