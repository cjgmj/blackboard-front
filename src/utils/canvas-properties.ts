import { v4 as uuidv4 } from 'uuid';

import { generateColor } from '../canvas/color-utils';

const id: string = uuidv4();
const color: string = generateColor();
const lineWidth: number = 4;

export { id, color, lineWidth };
