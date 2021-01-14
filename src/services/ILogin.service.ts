import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ILoginForm } from '../repositories/ILogin.repository';

export interface ILoginService{
    login(form: ILoginForm): Observable<UserModel>;

    logout(): Observable<boolean>;

    saveToken(deviceId: string, deviceToken: string): Observable<any>;
}

export const LOGIN_SERVICE = new InjectionToken<ILoginService>('loginService');
