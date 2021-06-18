import { v4 as uuidv4 } from 'uuid';

import { generateColor } from './color-utils';

const id = uuidv4();
const color = generateColor();

const divContent: HTMLDivElement = document.getElementById(
  'content'
) as HTMLDivElement;

const blackboard: HTMLCanvasElement = document.createElement(
  'canvas'
) as HTMLCanvasElement;
blackboard.setAttribute('id', `blackboard-${id}`);
blackboard.setAttribute('class', 'full-height');

divContent.appendChild(blackboard);

const context: CanvasRenderingContext2D | null = blackboard.getContext('2d');

const initCanvas = (): void => {
  blackboard.width = blackboard.clientWidth;
  blackboard.height = blackboard.clientHeight;

  context!.lineCap = 'round';
  context!.lineJoin = 'round';
  context!.strokeStyle = color;
  context!.lineWidth = 4;

  console.log(context!.strokeStyle);
};

const initialPoint = (x: number, y: number): void => {
  context!.beginPath();
  context!.moveTo(x, y);
};

const drawLine = (x: number, y: number): void => {
  context!.lineTo(x, y);
  context!.stroke();
};

export { blackboard, initCanvas, initialPoint, drawLine };
