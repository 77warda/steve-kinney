import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

startButtonClicks$.subscribe(() => {
  interval(1000).subscribe(setCount);
});
