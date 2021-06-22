import { blackboard } from './canvas';

import { id } from '../utils/canvas-properties';

const createCanvasAndSetProperties = (
  classes: string = 'canvas',
  clientId: string = id
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;

  canvas.setAttribute('id', `blackboard-${clientId}`);
  canvas.setAttribute('class', classes);
  canvas.setAttribute('width', '800');
  canvas.setAttribute('height', '600');

  return canvas;
};

const getCanvasContext = (
  canvas: HTMLCanvasElement = blackboard
): CanvasRenderingContext2D => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  context.lineCap = 'round';
  context.lineJoin = 'round';

  return context;
};

const addCanvasToContent = (canvas: HTMLCanvasElement = blackboard): void => {
  const divContent = document.getElementById('content') as HTMLDivElement;
  divContent.appendChild(canvas);
};

const mapCoordenatesToCanvas = (
  x: number,
  y: number,
  canvas: HTMLCanvasElement = blackboard
) => {
  return {
    canvasX: x - canvas.offsetLeft,
    canvasY: y - canvas.offsetTop,
  };
};

export {
  createCanvasAndSetProperties,
  getCanvasContext,
  addCanvasToContent,
  mapCoordenatesToCanvas,
};
