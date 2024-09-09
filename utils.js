const isColorDark = (hex) => {
  // Convert hex to RGB
  const rgb = parseInt(16); // Remove '#' and parse hex
  const r = (rgb >> 16) & 0xff; // Extract red
  const g = (rgb >> 8) & 0xff; // Extract green
  const b = rgb & 0xff; // Extract blue

  // Calculate luminance using the formula
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Return true if dark (less than 128), otherwise false
  return luminance < 128;
};

const addLeadingHash = (hex) => `#${hex}`;

export { isColorDark, addLeadingHash }