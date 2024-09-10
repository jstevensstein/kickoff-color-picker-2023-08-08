import { useState } from "react";
import { useRouter } from 'next/router';
import Form from "react-bootstrap/Form";
import Picker from "../picker";
import { ListGroup, Button } from 'react-bootstrap';
import { putPalette } from "../../services/paletteService";

const Palette = (props) => {
  const originalPalette = props.palette;
  let originalName = originalPalette.name;
  let originalColors = originalPalette.colors;

  const [name, setName] = useState(originalName || "");
  const [colors, setColors] = useState(originalColors || [""]);

  const router = useRouter();

  const [error, setError] = useState(null);

  const saveEnabled = () => {
    if (colors.some(color => !color) || !name) {
      return false;
    }
    if (originalName) {
      if (name === originalName || JSON.stringify(colors) === JSON.stringify(originalColors)) {
        return false;
      }
    }
    return true;
  };

  const savePalette = async () => {
    try {
      const result = await putPalette({name, colors});
      await router.push("/palette/save_successful");
    } catch (error) {
      setError(error.message);
    }
  }

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
            {colors.length > 1 ?
              <Button variant="danger"
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
        <Button variant="success" onClick={() => setColors([...colors, ""])}>
          Add another color
        </Button>
      ) : (
        ""
      )}
      <Button onClick={() => savePalette()} disabled={!saveEnabled()}>
        Save Palette
      </Button>
    </div>
  );
};

export default Palette;
