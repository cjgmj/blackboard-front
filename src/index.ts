import { mousedown$, obsmousemove$ } from './rxjs/events-rx';
import {
  connectSocket,
  drawMyBlackBoardInitialPoint,
  drawMyBlackBoard,
  listenSocket,
} from './socket/socket';
import { initCanvas, initialPoint, drawLine } from './canvas/canvas';
import {
  id,
  color,
  lineWidth,
  initCanvasInfo,
  getCanvasInfo,
} from './utils/canvas-properties';
import { CoordinatePoint } from './models/coordinate-point';

initCanvas(id, lineWidth);
initCanvasInfo();
connectSocket();

listenSocket();

mousedown$.subscribe(({ x, y }) => {
  initialPoint(x, y);

  getCanvasInfo().lastPoint = { x, y } as CoordinatePoint;
  drawMyBlackBoardInitialPoint(getCanvasInfo());

  obsmousemove$.subscribe(({ x, y }) => {
    drawLine(x, y, color, lineWidth);

    getCanvasInfo().lastPoint = { x, y } as CoordinatePoint;
    drawMyBlackBoard(getCanvasInfo());

    console.log(x, y);
  });
});
