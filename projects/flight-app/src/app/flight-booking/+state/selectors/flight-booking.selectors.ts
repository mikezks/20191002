import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureState, State, flightBookingFeatureKey } from "../reducers/flight-booking.reducer";

export const getFlightBookingState =
    createFeatureSelector<FeatureState, State>(flightBookingFeatureKey);

export const getFlights =
    createSelector(
        getFlightBookingState,
        (state) => state.flights
    );

export const getFlightsWithProps =
    createSelector(
        getFlights,
        (flights, props) => flights.filter(f => !props.blacklist.includes(f.id))
    );

export const getFilter =
    createSelector(
        getFlightBookingState,
        (state) => state.filter
    );

export const getFilterByActiveFilter =
    createSelector(
        getFlights,
        getFilter,
        (flights, filter) => flights.filter(f => f.from === filter.from && f.to === filter.to)
    );
