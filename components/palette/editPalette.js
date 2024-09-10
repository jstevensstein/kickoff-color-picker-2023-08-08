import { useEffect, useState } from "react";
import axios from "axios";
import { getPalette } from "../../services/paletteService";
import Palette from "./index";

const EditPalette = ({id}) => {
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    const fetchPalette = async () => {
      try {
        const data = await getPalette(id);
        setPalette(data);
      } catch (e) {
        //TODO: handle error
      }
    };

    fetchPalette();
  }, [setPalette, axios]);

  return (
    palette ?
      <Palette palette={palette} /> :
      null
  )
}

export default EditPalette;
