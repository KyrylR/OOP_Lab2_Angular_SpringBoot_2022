import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // console.log("Route: " + route.url)
    // console.log("Router: " + this.router.url)
    // if (route.url.toString() === "mainPage") {
    //   return true;
    // }

    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }
    console.log("Guard here!")
    // Get the roles required from the route.
    const requiredRoles = route.data["roles"];

    console.log('Data: ' + route.data["token"]);

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    console.log("requiredRoles: " + requiredRoles);
    console.log("Our roles: " + this.roles)
    // Allow the user to proceed if all the required roles are present.

    if (requiredRoles.some((role) => this.roles.includes(role))) {
      // window.sessionStorage.setItem("x-auth-token", route.data)
      return true;
    } else {
      // redirect to error page if the user doesn't have the necessary  role to access
      this.router.navigate(['access-denied']);
      return false;
    }
  }
}
