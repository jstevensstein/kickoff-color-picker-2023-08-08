import { useState, useEffect } from "react";
import axios from "axios";
import { searchPalettes } from "../../services/paletteService";
import { ListGroup } from "react-bootstrap";

const Search = () => {
  const [query, setQuery] = useState("");
  const [palettes, setPalettes] = useState(null);

  const getPalettes = async () => {
    try {
      const result = await searchPalettes(name);
      setPalettes(result);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getPalettes();
  }, [setPalettes, axios]);


  return (
    <>
      <ListGroup>
        {palettes.map((palette, index) => (
          <ListGroup.Item key={index}>
            <h4>{palette.name}</h4>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Search;
