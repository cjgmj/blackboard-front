import {
  createCanvasAndSetProperties,
  getCanvasContext,
  addCanvasToContent,
} from './canvas-utils';

import { color, lineWidth, initCanvasInfo } from '../utils/canvas-properties';

const blackboard = createCanvasAndSetProperties('canvas my-canvas');

const context = getCanvasContext();

const initCanvas = (): void => {
  addCanvasToContent();
  initCanvasInfo();
};

const initialPoint = (x: number, y: number): void => {
  context.beginPath();
  context.moveTo(x, y);
};

const drawLine = (
  x: number,
  y: number,
  brushColor: string = color,
  brushLineWidth: number = lineWidth
): void => {
  context.strokeStyle = brushColor;
  context.lineWidth = brushLineWidth;
  context.lineTo(x, y);
  context.stroke();
};

export { blackboard, initCanvas, initialPoint, drawLine };
