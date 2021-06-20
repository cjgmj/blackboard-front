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
  mapCoordenatesToCanvas,
} from './canvas/canvas';
import { id, canvasInfo } from './utils/canvas-properties';

initCanvas(id);
connectSocket();

listenSocket();

// TODO controlar que si se sale de la pantalla se corte el flujo
mousedown$.subscribe(({ x, y }) => {
  const { x: canvasX, y: canvasY } = mapCoordenatesToCanvas(x, y);

  initialPoint(canvasX, canvasY);

  canvasInfo.lastPoint = { x: canvasX, y: canvasY };
  drawMyBlackBoardInitialPoint(canvasInfo);

  obsmousemove$.subscribe(({ x, y }) => {
    const { x: canvasX, y: canvasY } = mapCoordenatesToCanvas(x, y);

    drawLine(canvasX, canvasY);

    canvasInfo.lastPoint = { x: canvasX, y: canvasY };
    drawMyBlackBoard(canvasInfo);
  });
});
