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


export interface INativeStorageService {
    getItem(key: string): Promise<string>;

    setItem(key: string, value: any): Promise<any>;

    removeItem(key: string): Promise<any>;

    keys(): Promise<Array<string>>;

    clearStorage(): Promise<any>;
}

export const NATIVE_STORAGE_SERVICE = new InjectionToken<INativeStorageService>('nativeStorageService');
