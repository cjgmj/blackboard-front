import {
  createCanvas,
  getCanvasContext,
  setCanvasProperties,
} from './canvas-utils';
import { color, lineWidth, initCanvasInfo } from '../utils/canvas-properties';

const divContent = document.getElementById('content') as HTMLDivElement;

const blackboard = createCanvas();

const context = getCanvasContext(blackboard);

const initCanvas = (id: string): void => {
  setCanvasProperties(blackboard, id, 'canvas my-canvas');
  addCanvasToContent();
  initCanvasInfo();
};

const addCanvasToContent = (): void => {
  divContent.appendChild(blackboard);
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

const mapCoordenatesToCanvas = (x: number, y: number) => {
  return {
    canvasX: x - blackboard.offsetLeft,
    canvasY: y - blackboard.offsetTop,
  };
};

export {
  blackboard,
  initCanvas,
  initialPoint,
  drawLine,
  mapCoordenatesToCanvas,
};
