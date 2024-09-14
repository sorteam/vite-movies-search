import { useFormik } from "formik";
import { Button, Col, Form } from "react-bootstrap";
import { MovieEntity } from "../../api";

type Props = {
  data: MovieEntity;
  onClose: () => void;
  onSubmit: (data: MovieEntity) => void;
};

type FormDataType = Pick<
  MovieEntity,
  "Title" | "Actors" | "Genre" | "Director" | "Plot" | "Year"
>;

export function EditForm({ data, onClose, onSubmit }: Props) {
  const formik = useFormik<FormDataType>({
    initialValues: data,
    onSubmit: (values) => {
      onSubmit({ ...data, ...values });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="Title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          name="Title"
          type="text"
          placeholder="Enter title"
          value={formik.values.Title}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Year">
        <Form.Label>Year</Form.Label>
        <Form.Control
          required
          name="Year"
          type="text"
          placeholder="Type year(s)"
          pattern="\d{4}(-\d{4})?"
          value={formik.values.Year}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Genre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          required
          name="Genre"
          type="text"
          placeholder="Enter genre"
          value={formik.values.Genre}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Director">
        <Form.Label>Director</Form.Label>
        <Form.Control
          required
          name="Director"
          type="text"
          placeholder="Enter director"
          value={formik.values.Director}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Actors">
        <Form.Label>Actors</Form.Label>
        <Form.Control
          required
          name="Actors"
          type="text"
          placeholder="Enter actors"
          value={formik.values.Actors}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Plot">
        <Form.Label>Plot</Form.Label>
        <Form.Control
          required
          name="Plot"
          as="textarea"
          rows={3}
          placeholder="Enter plot"
          value={formik.values.Plot}
          onChange={formik.handleChange}
        />
      </Form.Group>

      <Col className="mt-4 d-flex gap-3">
        <Button className="flex-grow-1" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="flex-grow-1" variant="primary" type="submit">
          Submit
        </Button>
      </Col>
    </Form>
  );
}
