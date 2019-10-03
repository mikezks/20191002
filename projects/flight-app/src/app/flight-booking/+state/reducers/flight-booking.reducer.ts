import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from '../actions/flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { RootState } from '../../../+state';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
}

export const initialState: State = {
  flights: []
};

export interface FeatureState extends RootState {
  [flightBookingFeatureKey]: State;
}

const flightBookingReducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),

  on(FlightBookingActions.flightsUpdate, (state, action) => {
    const flight = action.flight;
    const flights = state.flights.map(f => f.id === flight.id ? flight : f);
    return { ...state, flights };
  }),

);

export function reducer(state: State | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
