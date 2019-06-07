import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {metaReducers, reducers} from './app-store.reducer';
import {AuthEffects} from './auth.effects';
import {CustomRouterStateSerializer} from './custom-router-store-serializer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EffectsModule.forRoot([AuthEffects])
  ],
  exports: [StoreModule, EffectsModule],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ]
})
export class AppStoreModule {}
