import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State, reducer } from './reducers/app.reducer';

export interface RootState {
  app: State;
}

export const reducers: ActionReducerMap<RootState> = {
  app: reducer
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
