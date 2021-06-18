import { mousedown$, obsmousemove$ } from './rxjs/events-rx';
import {
  connectSocket,
  drawMyBlackBoardInitialPoint,
  drawMyBlackBoard,
} from './socket/socket';
import { initCanvas, initialPoint, drawLine } from './canvas/canvas';
import { id, color, lineWidth } from './utils/canvas-properties';
import { CanvasInfo, CoordinatePoint } from './models/canvas-info';

initCanvas(id, color, lineWidth);
connectSocket();

const canvasInfo: CanvasInfo = {} as CanvasInfo;
canvasInfo.id = id;
canvasInfo.color = color;

mousedown$.subscribe(({ x, y }) => {
  canvasInfo.lastPoint = { x, y } as CoordinatePoint;
  initialPoint(x, y);
  drawMyBlackBoardInitialPoint(canvasInfo);

  obsmousemove$.subscribe(({ x, y }) => {
    canvasInfo.lastPoint = { x, y } as CoordinatePoint;
    drawLine(x, y);
    drawMyBlackBoard(canvasInfo);

    console.log(x, y);
  });
});
