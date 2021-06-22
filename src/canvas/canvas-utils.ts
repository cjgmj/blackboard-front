const createCanvas = (): HTMLCanvasElement => {
  return document.createElement('canvas') as HTMLCanvasElement;
};

const setCanvasProperties = (
  canvas: HTMLCanvasElement,
  id: string,
  classes: string = 'canvas'
): void => {
  canvas.setAttribute('id', `blackboard-${id}`);
  canvas.setAttribute('class', classes);
  canvas.setAttribute('width', '800');
  canvas.setAttribute('height', '600');
};

const getCanvasContext = (
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  context.lineCap = 'round';
  context.lineJoin = 'round';

  return context;
};

export { createCanvas, getCanvasContext, setCanvasProperties };
