import { useState } from "react";
import { useRouter } from 'next/router';
import Form from "react-bootstrap/Form";
import Picker from "../picker";
import { ListGroup, Button } from 'react-bootstrap';
import { putPalette } from "../../services/paletteService";

const Palette = () => {
  const [name, setName] = useState("");
  const [colors, setColors] = useState([""]);

  const router = useRouter();

  const [error, setError] = useState(null);

  const saveDisabled = () => {
    return colors.some(color => !color) || !name;
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
      <Button onClick={() => savePalette()} disabled={saveDisabled()}>
        Save Palette
      </Button>
    </div>
  );
};

export default Palette;
