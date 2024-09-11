import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { HEX_COLOR_CODE_OPTIONAL_HASH } from "../../constants";
import { addLeadingHash, isColorDark } from "../../utils";

function isValidHex(text) {
  return HEX_COLOR_CODE_OPTIONAL_HASH.test(text);
}

const Picker = ({hexCode, setHexCode}) => {
  const [text, setText] = useState(hexCode);

  const colorCodeWithHash = () => {
    return addLeadingHash(hexCode);
  };

  const currentInputIsValid = () => {
    return isValidHex(text);
  }

  return (
    <div>
      <Form>
        <Form.Label>Hex Code</Form.Label>
        <Form.Control
          value={text}
          onChange={(ev) => {
            const {value} = ev.target;
            setText(value);
            if (isValidHex(value)) {
              setHexCode(value.startsWith("#") ? value.slice(1) : value);
            }
          }}
          isValid={currentInputIsValid()}
          className={text == '' || currentInputIsValid() ? '' : 'border-danger'}
          placeholder="#FFFFFF"
          onBlur={() => {
            setText(text == '' ? '' : hexCode)
          }}
        ></Form.Control>
        <Card
          style={{backgroundColor: colorCodeWithHash()}}
          className={isColorDark(hexCode) ? "text-light" : "text-dark"}
        >
          <Card.Body>
            <Card.Title>{colorCodeWithHash()}</Card.Title>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};

export default Picker;
