const divContent: HTMLDivElement = document.getElementById(
  'content'
) as HTMLDivElement;

const blackboard: HTMLCanvasElement = document.createElement(
  'canvas'
) as HTMLCanvasElement;
divContent.appendChild(blackboard);

const context: CanvasRenderingContext2D = blackboard.getContext(
  '2d'
) as CanvasRenderingContext2D;

const initCanvas = (id: string, color: string, lineWidth: number): void => {
  setPropertiesCanvas(id);
  setPropertiesContext(color, lineWidth);
};

const setPropertiesCanvas = (id: string) => {
  blackboard.setAttribute('id', `blackboard-${id}`);
  blackboard.setAttribute('class', 'full-height');
  blackboard.width = blackboard.clientWidth;
  blackboard.height = blackboard.clientHeight;
};

const setPropertiesContext = (color: string, lineWidth: number) => {
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
};

const initialPoint = (x: number, y: number): void => {
  context.beginPath();
  context.moveTo(x, y);
};

const drawLine = (x: number, y: number): void => {
  context.lineTo(x, y);
  context.stroke();
};

export { blackboard, initCanvas, initialPoint, drawLine };
