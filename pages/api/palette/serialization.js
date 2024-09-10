const serializePalette = (palette) => {
  const {name, colors} = palette;
  const color1 = colors[0];
  const color2 = colors[1];
  const color3 = colors[2];
  const color4 = colors[3];
  const color5 = colors[4];
  const res = {name, color1, color2, color3, color4, color5};
  return res;
}

const deserializePalette = (record) => {
  const colors = [];
  colors.push(record.color1)
  if (record.color2) {
    colors.push(record.color2);
    if (record.color3) {
      colors.push(record.color3);
      if (record.color4) {
        colors.push(record.color4);
        if (record.color5) {
          colors.push(record.color5);
        }
      }
    }
  }
  const palette = {
    id: record.id,
    name: record.name,
    colors,
  }
  return palette;
}

export { serializePalette, deserializePalette };