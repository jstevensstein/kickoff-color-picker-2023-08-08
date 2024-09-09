import axios from "axios";

const getPalette = async (id) => {
  const {status, data} = await axios.get(`/api/palette/${id}`);
  if (status === 200) {
    return data;
  } else {
    throw new Error("Error getting palette");
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

export { getPalette, putPalette }