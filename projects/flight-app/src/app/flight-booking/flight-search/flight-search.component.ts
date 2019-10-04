import {Component, OnInit} from '@angular/core';
import {Flight} from '@flight-workspace/flight-api';
import * as fromFlightBooking from '../+state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, startWith } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  /* from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false; */
  filterForm: FormGroup;
  flights$: Observable<Flight[]>;
  filter$: Observable<{ from: string, to: string}>;

/*   get flights() {
    return this.flightService.flights;
  }
 */
  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private store: Store<fromFlightBooking.FeatureState>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    // Change to RX Forms to use filter for selection from cache
    this.filterForm = this.fb.group({
      from: [ '', [ Validators.required ] ],
      to: [ '', [ Validators.required ] ],
      urgent: []
    }, {
    // Update filter inputs on blur
      updateOn: 'blur'
    });
    
    // Set filter values based on state initially
    this.store
      .pipe(
        select(fromFlightBooking.getFilter),
        first()
      )
      .subscribe(
        filter => this.filterForm.patchValue(filter)
      );

    // Update filter inputs on blur
    this.filterForm.valueChanges
      .pipe(
        startWith(this.filterForm.value)
      )
      .subscribe(
        filter => this.store.dispatch(
          fromFlightBooking.flightsFilter({
            from: filter.from,
            to: filter.to
          })
        )
      );

    // Select Flights from filtered state cache
    this.flights$ =
      this.store.pipe(
        //select(state => state.flightBooking.flights),
        //select(fromFlightBooking.getFlights }),
        //select(fromFlightBooking.getFlightsWithProps, { blacklist: [3] }),
        select(fromFlightBooking.getFilterByActiveFilter)
      );
  }

  search(): void {
    //if (!this.from || !this.to) return;

    /* this.flightService
      .load(this.from, this.to, this.urgent); */

    /* this.flightService
      .find(this.from, this.to)
      .subscribe(
        flights => this.store.dispatch(
          fromFlightBooking.flightsLoaded({ flights })
        )
      ); */

    this.store.dispatch(
      fromFlightBooking.flightsLoad({
        ...this.filterForm.value
      })
    );
  }

  delay(): void {
    //this.flightService.delay();

    this.flights$
      .pipe(
        first()
      )
      .subscribe(
        flights => {
          const flight = flights[0];
          const oldDate = new Date(flight.date);
          const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
          const newFlight = { ...flight, date: newDate.toISOString() };

          this.store.dispatch(
            fromFlightBooking.flightsUpdate({ flight: newFlight })
          );
        }
      );
  }

  throwError(): void {
    throw new Error("Demo for custom error handler!");
  }
}
