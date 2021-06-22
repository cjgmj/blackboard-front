import { mousedown$, obsmousemove$ } from './rxjs/events-rx';
import {
  connectAndListenSocket,
  emitDrawMyBlackboardInitialPoint,
  emitDrawMyBlackboard,
} from './socket/socket';
import {
  initCanvas,
  initialPoint,
  drawLine,
  mapCoordenatesToCanvas,
} from './canvas/canvas';
import { id, canvasInfo } from './utils/canvas-properties';

initCanvas(id);
connectAndListenSocket();

// TODO controlar que si se sale de la pantalla se corte el flujo
mousedown$.subscribe(({ x, y }) => {
  const { canvasX, canvasY } = mapCoordenatesToCanvas(x, y);

  initialPoint(canvasX, canvasY);

  canvasInfo.lastPoint = { x: canvasX, y: canvasY };
  emitDrawMyBlackboardInitialPoint(canvasInfo);

  obsmousemove$.subscribe(({ x, y }) => {
    const { canvasX, canvasY } = mapCoordenatesToCanvas(x, y);

    drawLine(canvasX, canvasY);

    canvasInfo.lastPoint = { x: canvasX, y: canvasY };
    emitDrawMyBlackboard(canvasInfo);
  });
});
