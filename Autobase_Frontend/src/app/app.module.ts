import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CarListComponent} from './components/Car/car-list/car-list.component';
import {CarDetailsComponent} from './components/Car/car-details/car-details.component';
import {DriverDetailsComponent} from './components/Driver/driver-details/driver-details.component';
import {DriverListComponent} from './components/Driver/driver-list/driver-list.component';
import {BidListComponent} from './components/Bid/bid-list/bid-list.component';
import {BidDetailsComponent} from './components/Bid/bid-details/bid-details.component';
import {CarDriverDetailsComponent} from './components/CarDriver/car-driver-details/car-driver-details.component';
import {CarDriverListComponent} from './components/CarDriver/car-driver-list/car-driver-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MainPageComponent} from './components/main-page/main-page.component';
import {PageNotFoundComponent} from './components/errorPages/page-not-found/page-not-found.component';
import {PageTimeOutComponent} from './components/errorPages/page-time-out/page-time-out.component';
import {PageForbiddenComponent} from './components/errorPages/page-forbidden/page-forbidden.component';
import {PageAccessDeniedComponent} from './components/errorPages/page-access-denied/page-access-denied.component';
import {KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {AuthGuard} from "./auth/auth.guard";
import {environment} from "../environments/environment";
import {AuthService} from "./auth/auth.service";

const routes: Routes = [
  {path: 'mainPage', component: MainPageComponent},
  {
    path: 'carDriver/:id',
    component: CarDriverDetailsComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_ADMIN', 'ROLE_MANAGER']},
  },
  {
    path: 'carDrivers',
    component: CarDriverListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  },
  {
    path: 'bid/:id',
    component: BidDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  },
  {
    path: 'bids',
    component: BidListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  },
  {
    path: 'car/:id',
    component: CarDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  },
  {
    path: 'cars',
    component: CarListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  },
  {
    path: 'driver/:id',
    component: DriverDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  },
  {
    path: 'drivers',
    component: DriverListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  },
  {
    path: 'sky',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  },
  {
    path: 'access-denied',
    component: PageAccessDeniedComponent,
    canActivate: [AuthGuard],
  },
  {path: '', redirectTo: '/mainPage', pathMatch: 'full'},
  {path: '**', redirectTo: '/mainPage', pathMatch: 'full'}
];

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        // silentCheckSsoRedirectUri:
        //   window.location.origin + `silent-check-sso.html`
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['mainPage'],
      loadUserProfileAtStartUp: true,
    });
}



@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarDetailsComponent,
    DriverDetailsComponent,
    DriverListComponent,
    BidListComponent,
    BidDetailsComponent,
    CarDriverDetailsComponent,
    CarDriverListComponent,
    MainPageComponent,
    PageNotFoundComponent,
    PageTimeOutComponent,
    PageForbiddenComponent,
    PageAccessDeniedComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
//@ts-ignore
export class AppModule {}
//@ts-ignore
