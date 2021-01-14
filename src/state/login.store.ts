import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSelector from './login.selectors';
import * as fromReducer from './login.reducer';
import * as fromActions from './login.actions';
import { ILoginForm } from '../repositories/ILogin.repository';
import { UserModel } from '../models/user.model';


@Injectable()
export class LoginStore {
    constructor(private store: Store<fromReducer.LoginState>) { }

    get User$() {
        return this.store.select(fromSelector.getUser);
    }

    get Loading$() {
        return this.store.select(fromSelector.getIsLoading);
    }

    get Error$() {
        return this.store.select(fromSelector.getError);
    }

    login(credentials: ILoginForm) {
        this.store.dispatch(fromActions.LoginBeginAction({ credentials }));
    }

    logout() {
        this.store.dispatch(fromActions.LogoutBeginAction());
    }

    setUserData(user: UserModel) {
        this.store.dispatch(fromActions.SetUserData({ user }));
    }
}
