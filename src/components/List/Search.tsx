import debounce from "lodash/debounce";
import {
  ChangeEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const Search = memo(function Search({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedOnChange = useMemo(() => debounce(onChange, 500), [onChange]);

  const onValueChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((evt) => setLocalValue(evt.target.value), []);

  useEffect(() => {
    debouncedOnChange(localValue);
  }, [debouncedOnChange, localValue]);

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search movie by title"
        value={localValue}
        onChange={onValueChange}
        data-testid="search"
      />
    </InputGroup>
  );
});
