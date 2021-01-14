import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { ILoginForm } from '../repositories/ILogin.repository';

export enum LoginActionTypes {
    LoginBegin = '[Login] Login begin',
    LoginSuccess = '[Login] Login success',
    LoginFail = '[Login] Login failure',

    LogoutBegin = '[Login] Logout begin',
    LogoutSuccess = '[Login] Logout success',
    LogoutFail = '[Login] Logout failure',

    SetUserData = '[Login] Set User Data',
}

// LOGIN...
export const LoginBeginAction = createAction(
    LoginActionTypes.LoginBegin,
    props<{ credentials: ILoginForm }>()
);

export const LoginSuccessAction = createAction(
    LoginActionTypes.LoginSuccess,
    props<{ user: UserModel }>()
);

export const LoginFailAction = createAction(
    LoginActionTypes.LoginFail,
    props<{ errors: any }>()
);

// LOGOUT...
export const LogoutBeginAction = createAction(
    LoginActionTypes.LogoutBegin
);

export const LogoutSuccessAction = createAction(
    LoginActionTypes.LogoutSuccess
);

export const LogoutFailAction = createAction(
    LoginActionTypes.LogoutFail,
    props<{ errors: any }>()
);

export const SetUserData = createAction(
    LoginActionTypes.SetUserData,
    props<{ user: UserModel }>()
);
