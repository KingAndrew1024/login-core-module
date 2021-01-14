import { createReducer, on, Action } from '@ngrx/store';
import { UserModel } from '../models/user.model';
import * as fromActions from './login.actions';


export interface LoginState {
    isLoading: boolean;
    user: UserModel;
    errors: any;
}

export const initialState: LoginState = {
    isLoading: false,
    user: UserModel.empty(),
    errors: null
};

const reducer = createReducer(
    initialState,
    // On Begin Actions
    on(fromActions.LoginBeginAction, fromActions.LogoutBeginAction, (state): LoginState => ({
        ...state,
        errors: null,
        isLoading: true
    })),

    // ON Success Actions
    on(fromActions.LoginSuccessAction, (state, action): LoginState => ({
        ...state,
        isLoading: false,
        user: action.user
    })),
    on(fromActions.LogoutSuccessAction, (state): LoginState => (initialState)),

    on(fromActions.SetUserData, (state, action): LoginState => ({
        ...state,
        user: action.user
    })),

    // ON Fail Actions
    on(fromActions.LoginFailAction, fromActions.LogoutFailAction, (state, action): LoginState => ({
        isLoading: false,
        user: UserModel.empty(),
        errors: action.errors
    })),
);

export function loginReducer(state: LoginState | undefined, action: Action) {
    return reducer(state, action);
}
