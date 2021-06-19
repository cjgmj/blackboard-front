import { color, lineWidth, initCanvasInfo } from '../utils/canvas-properties';

const divContent = document.getElementById('content') as HTMLDivElement;

const blackboard = document.createElement('canvas') as HTMLCanvasElement;
divContent.appendChild(blackboard);

const context = blackboard.getContext('2d') as CanvasRenderingContext2D;

const initCanvas = (id: string): void => {
  setPropertiesCanvas(id);
  setPropertiesContext();
  initCanvasInfo();
};

const setPropertiesCanvas = (id: string): void => {
  blackboard.setAttribute('id', `blackboard-${id}`);
  blackboard.setAttribute('class', 'full-height');
  blackboard.width = blackboard.clientWidth;
  blackboard.height = blackboard.clientHeight;
};

const setPropertiesContext = (): void => {
  context.lineCap = 'round';
  context.lineJoin = 'round';
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
