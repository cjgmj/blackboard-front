import { mousedown$, obsmousemove$ } from './rxjs/events-rx';
import {
  connectSocket,
  drawMyBlackBoardInitialPoint,
  drawMyBlackBoard,
  listenSocket,
} from './socket/socket';
import { initCanvas, initialPoint, drawLine } from './canvas/canvas';
import { id, canvasInfo } from './utils/canvas-properties';

initCanvas(id);
connectSocket();

listenSocket();

// TODO controlar que si se sale de la pantalla se corte el flujo
mousedown$.subscribe(({ x, y }) => {
  initialPoint(x, y);

  canvasInfo.lastPoint = { x, y };
  drawMyBlackBoardInitialPoint(canvasInfo);

  obsmousemove$.subscribe(({ x, y }) => {
    drawLine(x, y);

    canvasInfo.lastPoint = { x, y };
    drawMyBlackBoard(canvasInfo);
  });
});
