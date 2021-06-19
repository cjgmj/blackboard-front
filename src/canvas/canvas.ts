const divContent = document.getElementById('content') as HTMLDivElement;

const blackboard = document.createElement('canvas') as HTMLCanvasElement;
divContent.appendChild(blackboard);

const context = blackboard.getContext('2d') as CanvasRenderingContext2D;

const initCanvas = (id: string, lineWidth: number): void => {
  setPropertiesCanvas(id);
  setPropertiesContext();
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
  color: string,
  lineWidth: number
): void => {
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.lineTo(x, y);
  context.stroke();
};

export { blackboard, initCanvas, initialPoint, drawLine };
