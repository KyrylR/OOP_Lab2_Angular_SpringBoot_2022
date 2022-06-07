import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Autobase_Frontend';
  public isLoggedIn = false;

  constructor(private readonly keycloakService: KeycloakService,
              private router: Router) {
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

  }

  public logout() {
    this.keycloakService.logout().then(
      () => {
        console.log("Logout");
        this.router.navigate(['mainPage']);
      }
    );

  }
}
