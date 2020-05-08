import { ErrorHandlerService } from './../error-handler.service';
import { Component, OnInit } from '@angular/core';
import { AuthService, LogoutService } from './../../seguranca/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 constructor(
   public auth: AuthService,
   public logoutService: LogoutService,
   public errorHandler: ErrorHandlerService,
   public router: Router) {}

 exibindoMenu = false;

 ngOnInit() {
}

logout() {
this.logoutService.logout()
.then(() => {
 this.router.navigate(['/login']);
})
.catch(erro => this.errorHandler.handle(erro));

}

}
