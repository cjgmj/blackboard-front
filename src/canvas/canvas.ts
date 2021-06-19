import { color, lineWidth, initCanvasInfo } from '../utils/canvas-properties';

const divContent = document.getElementById('content') as HTMLDivElement;

const blackboard = document.createElement('canvas') as HTMLCanvasElement;

const context = blackboard.getContext('2d') as CanvasRenderingContext2D;

const initCanvas = (id: string): void => {
  setPropertiesCanvas(id);
  setPropertiesContext();
  initCanvasInfo();
};

const setPropertiesCanvas = (id: string): void => {
  blackboard.setAttribute('id', `blackboard-${id}`);
  blackboard.setAttribute('class', 'canvas');
  blackboard.setAttribute('width', '800');
  blackboard.setAttribute('height', '600');
  divContent.appendChild(blackboard);
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

const transformCoordenates = (x: number, y: number) => {
  return { x: x - blackboard.offsetLeft, y: y - blackboard.offsetTop };
};

export { blackboard, initCanvas, initialPoint, drawLine, transformCoordenates };
