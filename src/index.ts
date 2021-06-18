import { initCanvas, initialPoint, drawLine } from './canvas-utils';
import { mousedown$, obsmousemove$ } from './events-rx';

initCanvas();

mousedown$.subscribe(({ x, y }) => {
  initialPoint(x, y);

  obsmousemove$.subscribe(({ x, y }) => {
    drawLine(x, y);

    console.log(x, y);
  });
});
