import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, throwError, interval, combineLatest, iif, of } from 'rxjs';
import { tap, share, debounceTime, switchMap, filter, startWith, map, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerSubscription: Subscription;

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;
  online$: Observable<boolean>;
  online: boolean;
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    //this.rxjsDemo();
    this.initTypeahead();
  }

  rxjsDemo(): void {
    this.timer$ = timer(0, 1000)
      .pipe(
        tap(value => console.log('Implementierung wird durchlaufen', value)),
        //share()
      );
    
    this.timerSubscription =
    this.timer$
      .subscribe(console.log);
  }

  initTypeahead(): void {
    this.online$ =
      interval(2000)
        .pipe(
          startWith(0),
          map(() => Math.random() < 0.5),
          distinctUntilChanged(),
          tap(onlineState => this.online = onlineState)
        );

    this.flights$ =
      this.control
        .valueChanges
        .pipe(
          value => combineLatest(value, this.online$),
          filter(([from, online]) => online),
          map(([from, online]) => from),
          distinctUntilChanged(),
          debounceTime(300),
          //filter((from: string) => from.length > 2),
          switchMap(from => 
            iif(
              () => from.length > 2,
              of(from)
                .pipe(
                  tap(() => this.loading = true),
                  switchMap(from => this.load(from)),
                  tap(() => this.loading = false)
                ),
              of([])
            )
          )  
        );
  }

  load(from: string): Observable<Flight[]>  {
    let url = "http://www.angular.at/api/flight";

    let params = new HttpParams()
                        .set('from', from);

    let headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }
  
  ngOnDestroy(): void {
    //this.timerSubscription.unsubscribe();
  }
}
