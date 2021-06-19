import { v4 as uuidv4 } from 'uuid';

import { generateColor } from '../canvas/color-utils';
import { CanvasInfo } from '../models/canvas-info';

const id = uuidv4();
const color = generateColor();
const lineWidth = 4;
const canvasInfo = {} as CanvasInfo;

const initCanvasInfo = () => {
  canvasInfo.id = id;
  canvasInfo.color = color;
  canvasInfo.lineWidth = lineWidth;
};

export { id, color, lineWidth, canvasInfo, initCanvasInfo };
