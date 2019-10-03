import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';

export const flightsLoaded = createAction(
  '[FlightBooking] Flights loaded',
  props<{ flights: Flight[] }>()
);

export const flightsUpdate = createAction(
  '[FlightBooking] Flights update',
  props<{ flight: Flight }>()
);