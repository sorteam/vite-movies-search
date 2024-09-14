import { memo, useCallback, useMemo, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { MovieEntity } from "../../api";
import { useList } from "../../query";
import { Loader } from "../Loader";
import { View } from "../View";
import { Empty } from "./Empty";
import { ListItem } from "./ListItem";
import { Search } from "./Search";

export const List = memo(function List() {
  const [searchString, setSearchString] = useState<string>("");
  const [selectedId, selSelectedId] = useState<string>();

  const { data, isLoading, error, mutate } = useList(searchString);

  const onViewClose = useCallback(() => selSelectedId(undefined), []);
  const onMutate = useCallback(
    (newData: MovieEntity) => {
      data &&
        mutate(
          {
            ...data,
            Search: data.Search.map((v) =>
              v.imdbID === newData.imdbID ? newData : v
            ),
          },
          { revalidate: false }
        ).catch(console.log);
    },
    [data, mutate]
  );

  const selectedMovie = useMemo(
    () => data?.Search.find((v) => v.imdbID === selectedId),
    [data?.Search, selectedId]
  );

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Search value={searchString} onChange={setSearchString} />
          </Col>
        </Row>
        <Row className="justify-content-center g-4 flex-wrap">
          {!searchString ? (
            <Empty />
          ) : error ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              {"Please, try another request"}
            </Alert>
          ) : isLoading ? (
            <Col>
              <Loader />
            </Col>
          ) : (
            data?.Search.map((v) => (
              <Col key={v.imdbID} xs={6} md={4} xl={3} xxl={2}>
                <ListItem data={v} onClick={selSelectedId} />
              </Col>
            ))
          )}
        </Row>
      </Container>
      {selectedMovie && (
        <View movie={selectedMovie} onClose={onViewClose} onMutate={onMutate} />
      )}
    </>
  );
});
