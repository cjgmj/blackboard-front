import { mousedown$, obsmousemove$ } from './rxjs/events-rx';
import {
  connectAndListenSocket,
  emitDrawMyBlackboardInitialPoint,
  emitDrawMyBlackboard,
} from './socket/socket';
import { initCanvas, initialPoint, drawLine } from './canvas/canvas';
import { mapCoordenatesToCanvas } from './canvas/canvas-utils';

initCanvas();
connectAndListenSocket();

// TODO controlar que si se sale de la pantalla se corte el flujo
mousedown$.subscribe(({ x, y }) => {
  const { canvasX, canvasY } = mapCoordenatesToCanvas(x, y);
  initialPoint(canvasX, canvasY);

  emitDrawMyBlackboardInitialPoint(canvasX, canvasY);

  obsmousemove$.subscribe(({ x, y }) => {
    const { canvasX, canvasY } = mapCoordenatesToCanvas(x, y);
    drawLine(canvasX, canvasY);

    emitDrawMyBlackboard(canvasX, canvasY);
  });
});
