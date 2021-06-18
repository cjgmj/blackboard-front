import { initCanvas, initialPoint, drawLine } from './canvas/canvas';
import { mousedown$, obsmousemove$ } from './rxjs/events-rx';

initCanvas();

mousedown$.subscribe(({ x, y }) => {
  initialPoint(x, y);

  obsmousemove$.subscribe(({ x, y }) => {
    drawLine(x, y);

    console.log(x, y);
  });
});
