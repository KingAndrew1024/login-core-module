import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './login.actions';
import { ILoginService, LOGIN_SERVICE } from '../services/ILogin.service';
import { UserModel } from '../models/user.model';


@Injectable()
export class LoginEffects {

    login$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.LoginActionTypes.LoginBegin),
            switchMap((action) => {
                return this.service.login(( action as any).credentials).pipe(
                    map((user: UserModel) => fromActions.LoginSuccessAction({ user })),
                    catchError(error => {
                        console.error('Couldn\'t login', error);
                        return of(fromActions.LoginFailAction({ errors: error }));
                    })
                );
            })
        )
    );

    logout$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.LoginActionTypes.LogoutBegin),
            switchMap(() => {
                return this.service.logout().pipe(
                    map((success: boolean) => fromActions.LogoutSuccessAction()),
                    catchError(error => {
                        console.error('Couldn\'t logout', error);
                        return of(fromActions.LogoutFailAction({ errors: error }));
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        @Inject(LOGIN_SERVICE) private service: ILoginService
    ) { }
}
