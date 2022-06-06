import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {
  }

  getUserName(): string {
    return this.keycloakService.getUsername();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  getLoggedUser(): any {
    return this.keycloakService.getKeycloakInstance().idTokenParsed;
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = "";
    try {
      // @ts-ignore
      token = this.keycloak.getKeycloakInstance().token();
    } catch (Error) {
      token = ""
    }
    console.log("Token: " + token);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request);
  }
}
