const generateColor = (): string => {
  return `#${generateHex()}${generateHex()}${generateHex()}`;
};

const generateHex = (): string => {
  var hex = Number(Math.floor(Math.random() * 255)).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

export { generateColor };
