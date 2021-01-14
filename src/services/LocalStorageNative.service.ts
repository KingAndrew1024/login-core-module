import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppSettingsService } from '../providers/global-params';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageNativeService {
    private storage: any;

    constructor(
        private appSettings: AppSettingsService,
        private stg: NativeStorage
    ) {
        this.storage = this.isSupportedPlaform() ? stg : localStorage;
    }

    getItem(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.isSupportedPlaform()) {
                ( this.storage as NativeStorage)
                    .getItem(key).then(
                        (val) => resolve(val),
                        e => {
                            if (e.code && e.code === 2) {
                                // Key is not present in storage
                                resolve(null);
                            }
                            else {
                                console.error(`REJECT: ERROR while trying to get key ${key} from localstore`);
                                reject(e);
                            }
                        }
                    ).catch(e => {
                        if (e.code && e.code === 2) {
                            // Key is not present in storage
                            resolve(null);
                        }
                        else {
                            console.error(`CATCH: ERROR while trying to get key ${key} from localstore`);
                            reject(e);
                        }
                    });
            }
            else {
                resolve(this.storage.getItem(key));
            }
        });
    }

    setItem(key: string, value: any): Promise<any> {
        return Promise.resolve(this.storage.setItem(key, value));
    }

    removeItem(key: string): Promise<any> {
        return this.isSupportedPlaform() ?
            ( this.storage as NativeStorage).remove(key) :
            Promise.resolve(this.storage.removeItem(key));
    }

    keys(): Promise<Array<string>> {
        if (this.isSupportedPlaform()) {
            return this.stg.keys();
        }

        const keys: Array<string> = [];

        for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i));
        }

        return Promise.resolve(keys);
    }

    clearStorage(): Promise<any> {
        return Promise.resolve(this.storage.clear());
    }

    private isSupportedPlaform(){
        return (this.appSettings.getPlatformName() === 'cordova' || this.appSettings.getPlatformName() === 'capacitor');
    }
}
