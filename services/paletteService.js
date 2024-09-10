import axios from "axios";

const getPalette = async (id) => {
  try {
    const {status, data} = await axios.get(`/api/palette?id=${id}`);
    if (status === 200) {
      return data;
    } else {
      throw new Error("Error getting palette");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }

}

/**
 * Upserts a palette.
 * @param data
 * @returns {Promise<any>}
 */
const putPalette = async (palette) => {
  if (!palette) return;
  try {
    const {status, data} = await axios.put("/api/palette", palette);

    if (status === 200) {
      return data;
    } else {
      throw new Error("Error putting palette");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const searchPalettes = async (query) => {
  try {
    const {status, data} = await axios.get("/api/palette/search", {
      params: {
        query
      }
    });
    if (status === 200) {
      return data;
    } else {
      throw new Error("Error searching palettes");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export { getPalette, putPalette, searchPalettes }