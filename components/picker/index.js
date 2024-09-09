import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import {HEX_COLOR_CODE_OPTIONAL_HASH} from "../../constants";

function isValidHex(text) {
  return HEX_COLOR_CODE_OPTIONAL_HASH.test(text);
}

//TODO: Move into utils.
function isColorDark(hex) {
  // Convert hex to RGB
  const rgb = parseInt(16); // Remove '#' and parse hex
  const r = (rgb >> 16) & 0xff; // Extract red
  const g = (rgb >> 8) & 0xff; // Extract green
  const b = rgb & 0xff; // Extract blue

  // Calculate luminance using the formula
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Return true if dark (less than 128), otherwise false
  return luminance < 128;
}

const Picker = ({hexCode, setHexCode}) => {
  const [text, setText] = useState("");

  const getHexCodeWithHash = () => {
    return `#${hexCode}`;
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
            const { value } = ev.target;
            setText(value);
            if (isValidHex(value)) {
              setHexCode(value.startsWith("#") ? value.slice(1) : value);
            }
          }}
          isValid={currentInputIsValid()}
          className={text == '' || currentInputIsValid() ? '' : 'border-danger'}
          placeholder="#FFFFFF"
          onBlur={() => {
            setText(text == '' ? '' : hexCode)}}
        ></Form.Control>
        <Card
          style={{ backgroundColor: getHexCodeWithHash() }}
          className={isColorDark(hexCode) ? "text-light" : "text-dark"}
        >
          <Card.Body>
            <Card.Title>{getHexCodeWithHash()}</Card.Title>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};

export default Picker;
