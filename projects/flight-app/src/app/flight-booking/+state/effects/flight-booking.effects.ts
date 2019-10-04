import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import * as FlightBookingActions from '../actions/flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';


@Injectable()
export class FlightBookingEffects {


  flightLoad$ =
    createEffect(() => this.actions$
      .pipe(
        ofType(FlightBookingActions.flightsLoad),
        switchMap(a => this.flightService.find(a.from, a.to)),
        map(flights => FlightBookingActions.flightsLoaded({ flights }))
      ));


  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}

}
