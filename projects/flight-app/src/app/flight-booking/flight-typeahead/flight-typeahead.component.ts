import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { tap, share } from 'rxjs/operators';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerSubscription: Subscription;
  
  constructor() { }
  
  ngOnInit() {
    this.timer$ = timer(0, 1000)
      .pipe(
        tap(value => console.log('Implementierung wird durchlaufen', value)),
        //share()
      );
    
    this.timerSubscription =
    this.timer$
      .subscribe(console.log);
  }
  
  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
