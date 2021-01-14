import { LoginModuleOptionsInterface } from '../login.module';

export class AppSettingsService {
    constructor(settings: LoginModuleOptionsInterface) {
        this.setApiUrl(settings.apiUrl);
        this.setInstanceName(settings.instanceName);
        this.setPlatformName(settings.platformName);
    }

    private apiUrl: string;
    private instanceName: string;
    private platformName: string;

    setApiUrl(url: string) { this.apiUrl = url; }
    getApiUrl() { return this.apiUrl; }
    setInstanceName(val: string) { this.instanceName = val; }
    getInstanceName() { return this.instanceName; }
    setPlatformName(val: string){ this.platformName = val; }
    getPlatformName(){ return this.platformName; }
}
