import { useState } from "react";
import Form from "react-bootstrap/Form";
import Picker from "../picker";
import { ListGroup, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';


const Pallete = () => {
  const [name, setName] = useState("");
  const [colors, setColors] = useState([""]);

  const cannotSave = () => {
    return colors.some(color => !color) || !name;
  };

  const cannotSaveTooltip = () => (
    <Tooltip>
      Simple tooltip
    </Tooltip>
  );

  return (
    <div>
      <h3>Name</h3>
      <Form.Control
        value={name}
        onChange={(ev) => {
          setName(ev.target.value);
        }}
        placeholder="foobar"
      ></Form.Control>
      <ListGroup>
        {colors.map((color, index) => (
          <ListGroup.Item key={index}>
            <h4>Color {index + 1}</h4>
            <Picker hexCode={color} setHexCode={hexCode => {
              const newColors = [...colors];
              newColors[index] = hexCode;
              setColors(newColors);
            }} />
            {colors.length > 1 ? <Button
              onClick={() => {
                setColors(colors.filter((_, i) => i !== index));
              }}
            >
              Remove
            </Button> : null}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {colors.length < 5 ? (
        <Button onClick={() => setColors([...colors, ""])}>
          Add another color
        </Button>
      ) : (
        ""
      )}
      <OverlayTrigger
        placement="right"
        delay={{show: 250, hide: 400}}
        overlay={cannotSaveTooltip}
      >
        <Button onClick={() => null} disabled={cannotSave()}>
          Save Pallet
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default Pallete;
