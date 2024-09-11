import { useState } from "react";
import { useRouter } from 'next/router';
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Picker from "../picker";
import { ListGroup, Button } from 'react-bootstrap';
import { putPalette, deletePalette } from "../../services/paletteService";

const Palette = (props) => {
  const originalPalette = props.palette;
  let originalName;
  let originalColors;
  if (originalPalette) {
    originalName = originalPalette.name;
    originalColors = originalPalette.colors;
  }

  const [name, setName] = useState(originalName || "");
  const [colors, setColors] = useState(originalColors || [""]);

  const router = useRouter();

  const [error, setError] = useState(null);

  const canAdd = () => {
    return !colors.some(color => !color) && name;
  }

  const canUpdate = () => {
    if (originalName) {
      return name !== originalName || JSON.stringify(colors) !== JSON.stringify(originalColors);
    }
    return false;
  }

  const updatePalette = async () => {
    try {
      const result = await putPalette({id: originalPalette.id, name, colors});
      await router.push("/palette/save_successful");
    } catch (error) {
      setError(error.message);
    }
  }

  const deleteThisPalette = async () => {
    try {
      const result = await deletePalette(originalPalette.id);
      await router.push("/search");
    } catch (error) {
      setError(error.message);
    }
  }

  const addPalette = async () => {
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
      <Button onClick={() => addPalette()} disabled={!canAdd()}>
        Save {originalName ? "As New" : null} Palette
      </Button>
      {
        originalPalette ?
          (<>
            <Button onClick={() => updatePalette()} disabled={!(canAdd() && canUpdate())}>
              Update Palette
            </Button>
            <Button onClick={() => deleteThisPalette()} variant="danger">
              Delete Palette
            </Button>
          </>) :
          null
      }
      {
        error ?
          (<Alert variant="danger">
            {error}
          </Alert>) : null}
    </div>
  );
};

export default Palette;
