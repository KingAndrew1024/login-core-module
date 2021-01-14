import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ILoginService } from './ILogin.service';
import { LoginRepository } from '../repositories/login.repository';
import { ILoginForm, ISaveTokenDataResponse } from '../repositories/ILogin.repository';
import { UserModel } from '../models/user.model';
import { LocalStorageNativeService } from './LocalStorageNative.service';

const helper = new JwtHelperService();
export const TOKEN_KEY = 'AUTH_TOKEN';

export function jwtOptionsFactory(localStge: LocalStorageNativeService) {
    return {
        tokenGetter: () => localStge.getItem(TOKEN_KEY)
    };
}

@Injectable()
export class LoginService implements ILoginService {
    constructor(
        private localStge: LocalStorageNativeService,
        private repository: LoginRepository) {}

    login(credentials: ILoginForm): Observable<UserModel> {
        return this.repository.login(credentials).pipe(
            map(response => {
                if (response.status !== 'success' || !response.data.token) {
                throw new Error('No token was received');
                }

                this.localStge.setItem(TOKEN_KEY, response.data.token);

                const user = helper.decodeToken(response.data.token);

                const User = UserModel.fromTokenData(user);

                this.localStge.setItem('username', User.name);

                return User;

            }),
            catchError(e => {
                console.error('CATCH: AuthenticationService.login() -> repository.login()', e);
                throw (e);
            })
        );
    }

    logout(): Observable<boolean> {

        return new Observable(subcriber => {
            this.localStge.clearStorage()
                .then(_ => {
                    this.localStge.setItem('tutorial', 'OK');

                    subcriber.next(true);
                })
                .catch(e => {
                    console.error('AuthenticationService.logout()->this.localStge.clearStorage()', e);

                    subcriber.error(e);
                });
        });
    }

    saveToken(deviceId: string, deviceToken: string): Observable<ISaveTokenDataResponse>{
        return this.repository.saveToken(deviceId, deviceToken).pipe(
            map(response => {
                return response.data;
            }),
            catchError(e => {
                console.error('CATCH: AuthenticationService.saveToken() -> repository.saveToken()', e);
                throw (e);
            })
        );
    }

    /*loadStoredToken() {
        let platformObs = from(this.plt.ready());

        return platformObs.pipe(
            switchMap(() => {
                return from(this.localStge.getItem(TOKEN_KEY));
            }),
            map(token => {
                if (token) {

                    let decoded = helper.decodeToken(TOKEN_KEY);
                    return decoded;
                } else {
                    return null;
                }
            })
        );
    }*/

    isAuthenticated() {

    }

    getSession() {
        return this.localStge.getItem(TOKEN_KEY).then(token => {
            const user = helper.decodeToken(token);

            const User = UserModel.fromTokenData(user);

            return User;
        });
    }

    getUserName(){
        return this.localStge.getItem('username');
    }

    storeSession() { }

    getStoredSession() { }

    refreshToken() { }


}
