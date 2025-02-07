import { Component } from '@angular/core';
import { AccesTokenDecodedType } from '../interfaces/auth';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  decoded : AccesTokenDecodedType | { user: {} } = this.decodeUser();
  //userConnected = this.decoded?.user;
  userConnected = this.decoded?.user;

  //isAdmin = this.userConnected?.roles.includes( ROLES.admin )
  isAdmin = false;

  signOut() {
    console.log('Sign out');
  }

  goToProfileHandler() {
    console.log('Go to profile')
  }

  decodeUser() {
    return {user: {}}
  }
}
