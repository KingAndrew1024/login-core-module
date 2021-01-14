import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppSettingsService } from './providers/global-params';
import { LOGIN_REPOSITORY } from './repositories/ILogin.repository';
import { LoginRepository } from './repositories/login.repository';
import { LOGIN_SERVICE } from './services/ILogin.service';
import { LoginService } from './services/login.service';
import { LoginEffects } from './state/login.effects';
import { loginReducer } from './state/login.reducer';
import { LoginStore } from './state/login.store';

export const AppSettingsObject = new InjectionToken('AppSettingsObject');

export function createAppSettingsService(settings: LoginModuleOptionsInterface) {
    return new AppSettingsService(settings);
}

@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forFeature('login', loginReducer),
        EffectsModule.forFeature([LoginEffects]),
    ],
    providers: [

    ],
    declarations: [
        // declare all components that your module uses
        // MyComponent
    ],
    exports: [
        // export the component(s) that you want others to be able to use
        // MyComponent
    ]
})
export class LoginCoreModule {
    static forRoot(config: LoginModuleOptionsInterface): ModuleWithProviders<LoginCoreModule> {

        return {
            ngModule: LoginCoreModule,
            providers: [
                { provide: AppSettingsObject, useValue: config },
                {
                    provide: AppSettingsService,
                    useFactory: (createAppSettingsService),
                    deps: [AppSettingsObject]
                },
                { provide: LOGIN_SERVICE, useClass: LoginService },
                { provide: LOGIN_REPOSITORY, useClass: LoginRepository },
                LoginStore
            ]
        };
    }
}

export interface LoginModuleOptionsInterface {
    apiUrl: string;
    instanceName: string;
    platformName: string;
}

