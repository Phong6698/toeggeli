import {LOCALE_ID, NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {AppStoreModule} from './store/app-store.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatDividerModule, MatSnackBarModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {registerLocaleData} from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';

registerLocaleData(localeDECH);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatSidenavModule,
    MatDividerModule,
    MatSnackBarModule,
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AppStoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de-ch'}],
  bootstrap: [AppComponent]
})
export class AppModule {}
