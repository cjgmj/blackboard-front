import { fromEvent } from 'rxjs';
import { takeUntil, distinctUntilKeyChanged, map } from 'rxjs/operators';

const blackboard: HTMLCanvasElement = document.getElementById(
  'blackboard'
) as HTMLCanvasElement;

const context = blackboard.getContext('2d');

(function () {
  blackboard.width = blackboard.clientWidth;
  blackboard.height = blackboard.clientHeight;

  context!.lineCap = 'round';
  context!.lineJoin = 'round';
  context!.strokeStyle = 'black';
  context!.lineWidth = 4;
})();

const mousedown$ = fromEvent<MouseEvent>(blackboard, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(blackboard, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(blackboard, 'mouseup');

mousedown$.subscribe(({ x, y }) => {
  context!.beginPath();
  context!.moveTo(x, y);

  mousemove$
    .pipe(
      map(({ x, y }) => ({ x, y, point: `${x}-${y}` })),
      distinctUntilKeyChanged('point'),
      takeUntil(mouseup$)
    )
    .subscribe(({ x, y }) => {
      context!.lineTo(x, y);
      context!.stroke();

      console.log(x, y);
    });
});
