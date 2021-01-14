import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginDataResponse, ILoginForm, ILoginRepository, ISaveTokenDataResponse } from './ILogin.repository';
import { IHttpBasicResponse } from '../core/IHttpBasicResponse';
import { AppSettingsService } from '../providers/global-params';


@Injectable()
export class LoginRepository implements ILoginRepository {
    readonly BASE_URL = `${this.appSettings.getApiUrl()}`;
    readonly LOGIN_URL: string = `/api/v2/auth/login`;
    readonly REFRESH_TOKEN_URL: string = '/api/v1/auth/refresh_token';

    constructor(
        private http: HttpClient,
        private appSettings: AppSettingsService
    ) { }

    login(credentials: ILoginForm): Observable<IHttpBasicResponse<ILoginDataResponse>> {

        let params = new HttpParams();

        for (const property in credentials) {
            if (credentials.hasOwnProperty(property)) {
                params = params.append(property, credentials[property]);
            }
        }

        const body = params.toString();

        return this.http.post<IHttpBasicResponse<ILoginDataResponse>>(`${this.BASE_URL}${this.LOGIN_URL}`, body);
    }

    saveToken(deviceId: string, fcmRegistrationId: string): Observable<IHttpBasicResponse<ISaveTokenDataResponse>> {
        const data = { device_id: deviceId, fcm_registration_id: fcmRegistrationId };

        let params = new HttpParams();

        for (const property in data) {
            if (data.hasOwnProperty(property)) {
                params = params.append(property, data[property]);
            }
        }

        const body = params.toString();

        return this.http.post<any>(`${this.BASE_URL}/api/${this.appSettings.getInstanceName()}/v1/fcm/devices`, body);
    }
}
