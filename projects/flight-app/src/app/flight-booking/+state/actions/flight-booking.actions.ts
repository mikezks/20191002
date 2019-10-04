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

export const flightsLoad = createAction(
  '[FlightBooking] Flights load',
  props<{ from: string, to: string }>()
);

export const flightsFilter = createAction(
  '[FlightBooking] Flights Filter',
  props<{ from: string, to: string }>()
);
