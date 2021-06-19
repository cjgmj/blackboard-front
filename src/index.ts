import { mousedown$, obsmousemove$ } from './rxjs/events-rx';
import {
  connectSocket,
  drawMyBlackBoardInitialPoint,
  drawMyBlackBoard,
  listenSocket,
} from './socket/socket';
import {
  initCanvas,
  initialPoint,
  drawLine,
  transformCoordenates,
} from './canvas/canvas';
import { id, canvasInfo } from './utils/canvas-properties';

initCanvas(id);
connectSocket();

listenSocket();

// TODO controlar que si se sale de la pantalla se corte el flujo
mousedown$.subscribe(({ x, y }) => {
  const { x: pointX, y: pointY } = transformCoordenates(x, y);

  initialPoint(pointX, pointY);

  canvasInfo.lastPoint = { x: pointX, y: pointY };
  drawMyBlackBoardInitialPoint(canvasInfo);

  obsmousemove$.subscribe(({ x, y }) => {
    const { x: pointX, y: pointY } = transformCoordenates(x, y);

    drawLine(pointX, pointY);

    canvasInfo.lastPoint = { x: pointX, y: pointY };
    drawMyBlackBoard(canvasInfo);
  });
});
