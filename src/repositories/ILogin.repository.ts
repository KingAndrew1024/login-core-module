import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpBasicResponse } from '../core/IHttpBasicResponse';

export interface ILoginRepository {
    login(form: ILoginForm): Observable<IHttpBasicResponse<ILoginDataResponse>>;
    saveToken(deviceId: string, deviceToken: string): Observable<IHttpBasicResponse<any>>;
}

export const LOGIN_REPOSITORY = new InjectionToken<ILoginRepository>('loginRepository');

export interface ILoginForm {
    user: string;
    password: string;
    device_id: string;
    device_model: string;
}

export interface ILoginDataResponse {
    token: string;
}

export interface ISaveTokenDataResponse{
    user_id: string;
    device_id: string;
    fcm_registration_id: string;
    created_at: string;
}
