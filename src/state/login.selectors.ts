import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './login.reducer';


export const getLoginState = createFeatureSelector<fromReducer.LoginState>('login');

export const getLoginPageState = createSelector(
    getLoginState,
    state => state
);

export const storeGetIsLoading = (state: fromReducer.LoginState) => state.isLoading;
export const storeGetUser = (state: fromReducer.LoginState) => state.user;

export const getIsLoading = createSelector(
    getLoginPageState,
    storeGetIsLoading
);
export const getUser = createSelector(
    getLoginPageState,
    storeGetUser
);

export const getError = createSelector(
    getLoginPageState,
    state => state.errors
);
