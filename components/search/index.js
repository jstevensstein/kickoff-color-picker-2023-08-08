import { useState, useEffect } from "react";
import axios from "axios";
import { searchPalettes } from "../../services/paletteService";
import { ListGroup, Stack } from "react-bootstrap";
import { isColorDark } from "../../utils";

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
        {palettes ?
          <ListGroup>
            {palettes.map((palette, i) => (
              <ListGroup.Item key={i}>
                <a href={`/palette/${palette.id}`} style={{textDecoration:"none"}}>
                <h3>{palette.name}</h3>
                <Stack direction="horizontal" gap="4">
                  {palette.colors.map((color, j) => {
                    const code = `#${color}`;
                    return (
                      <div style={{backgroundColor: code}} key={j}
                           className={isColorDark(color) ? "text-light" : "text-dark"}>
                        <h4>
                          {code}
                        </h4>
                      </div>
                    )
                  })}
                </Stack>
                </a>
              </ListGroup.Item>
            ))}
          </ListGroup>
          : null}
      </>
    );
  }
;

export default Search;
