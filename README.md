# Virket's Login core module
  Login module that implements
  * Login types (interfaces)
  * Login Model
  * Repository
  * Service
  * State management (actions, effects, reducers, selectors)

## Using your module in an Ionic 5 app

```typescript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
...


// Import the module
import { LoginCoreModule } from 'virket/login-core/dist/src';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    ...
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ...
    LoginCoreModule.forRoot({
      apiUrl: environment.apiUrl,
      instanceName: environment.instanceName,
      loginOptionsProvider: {
        provide: NATIVE_STORAGE_SERVICE,
        useClass: LocalStorageNativeService //or ionic's NativeStorage class
      },
    }),
    ...
  ],
  providers: [
    ...
    LoginStore,
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Compile this module
https://stackoverflow.com/questions/60290309/error-ng6002-appears-in-the-ngmodule-imports-of-appmodule-but-could-not-be-res

- OPTION 1: add this to package.json => scripts:{...}

"postinstall": "ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points"

- then run: npm run postinstall

- OPTION 2:  In Your "tsconfig.app.json" Add Following Lines:

"angularCompilerOptions": { 
  ...
  "enableIvy": false 
}




