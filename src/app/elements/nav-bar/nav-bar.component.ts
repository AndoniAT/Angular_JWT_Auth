import { Component } from '@angular/core';
import { AuthUserType } from '../../interfaces/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule, NgIcon],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  viewProviders: [provideIcons({ heroUserCircle })],
})
export class NavBarComponent {
  userConnected : AuthUserType | undefined =  undefined;
  isAdmin = false;

  constructor( readonly authService: AuthService, readonly router: Router ) {
    this.userConnected = this.authService.getUserLogged();
    this.isAdmin = this.userConnected?.roles.includes( AuthService.ROLES.admin ) || false;
  }

  signOut() {
    this.authService.logout()
    .subscribe({
      next: ( data:any ) => {
        this.router.navigateByUrl('/').then(() => {
          location.replace( location.href ); // Replace current url by the same to revalidate
        });
      },
      error: console.error
    })
  }
}
