import { AppSettingsService } from './global-params';

describe('AppSettingsService', () => {
    const apiUrl = 'the api url';
    const instanceName = 'the instance name';

    it('Should run setApiUrl on constructor', () => {
        const spyOnSetApiUrl = spyOn(AppSettingsService.prototype, 'setApiUrl').and.callThrough();
        const spyOnSetInstanceName = spyOn(AppSettingsService.prototype, 'setInstanceName').and.callThrough();

        const appSettingsService = new AppSettingsService({
            apiUrl,
            instanceName,
            loginOptionsProvider: null
        });

        expect(spyOnSetApiUrl).toHaveBeenCalledTimes(1);
        expect(spyOnSetInstanceName).toHaveBeenCalledTimes(1);
        expect(appSettingsService.getApiUrl()).toEqual(apiUrl);
        expect(appSettingsService.getInstanceName()).toEqual(instanceName);
    });
});
