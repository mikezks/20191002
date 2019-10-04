import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from '../actions/flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { RootState } from '../../../+state';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
  filter: { from: string, to: string }
}

export const initialState: State = {
  flights: [],
  filter: { from: 'Graz', to: 'Hamburg' }
};

export interface FeatureState extends RootState {
  [flightBookingFeatureKey]: State;
}

const flightBookingReducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    // Cache Flights and replace with new items
    const flights = [
      ...state.flights.filter(f =>
        !action.flights[0] || (
          f.from !== action.flights[0].from &&
          f.to !== action.flights[0].to
        )
      ),
      ...action.flights
    ];
    return { ...state, flights };
  }),

  on(FlightBookingActions.flightsUpdate, (state, action) => {
    const flight = action.flight;
    const flights = state.flights.map(f => f.id === flight.id ? flight : f);
    return { ...state, flights };
  }),

  on(FlightBookingActions.flightsFilter, (state, action) => {
    return { ...state, filter: { from: action.from, to: action.to } };
  }),

);

export function reducer(state: State | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
