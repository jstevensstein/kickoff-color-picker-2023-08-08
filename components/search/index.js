import { useState, useEffect } from "react";
import axios from "axios";
import { searchPalettes } from "../../services/paletteService";
import { ListGroup, Stack } from "react-bootstrap";
import { isColorDark } from "../../utils";
import Form from "react-bootstrap/Form";
import debounce from "lodash/debounce";

const Search = () => {
    const [query, setQuery] = useState("");
    const [palettes, setPalettes] = useState(null);

    const getPalettes = async () => {
      try {
        const result = await searchPalettes(query);
        setPalettes(result);
      } catch (error) {
        setError(error.message);
      }
    }


    const debouncedSearch = debounce((q) => {
      getPalettes();
    }, 500);

    useEffect(() => {
      debouncedSearch(query);

      return () => debouncedSearch.cancel();
    }, [query])

    /*
     Initialize with a primary set of queries;
     */
    useEffect(() => {
      getPalettes();
    }, [setPalettes, axios]);


    return (
      <>
        <Form.Control
          value={query}
          onChange={(ev) => {
            setQuery(ev.target.value);
          }}
          placeholder="Search..."
        ></Form.Control>
        {palettes ?
          <ListGroup>
            {palettes.map((palette, i) => (
              <ListGroup.Item key={i}>
                <a href={`/palette/${palette.id}`} style={{textDecoration: "none"}}>
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
