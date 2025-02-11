import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroEye } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  viewProviders: [ provideIcons( { featherAirplay, heroEye } ) ],
})
export class LoginComponent {
  
  typePassword = true;
  error = "";
  
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService:AuthService, private router: Router) {

  }

  handleSubmit() {
    console.log(
      this.profileForm.value.username + ' | ' + this.profileForm.value.password
    );

    const username = this.profileForm.value.username;
    const password = this.profileForm.value.password;

    if( !username || !password ) return;
    
    this.authService.login( username, password ).subscribe( {
      next: ( data:any ) => {
        const { accessToken } = data;
        localStorage.setItem( 'token', accessToken );
        this.router.navigateByUrl('/').then(() => {
          location.replace( location.href );
        });
      },
      error: ( err:any ) => {
        const message = err?.error?.message ?? "Login failed";

        if( !err.error ) {
            this.error = "No server response";
            return;
        }
        this.error = message;
      }
    } )
  }

  changeTypePassword() {
    this.typePassword = !this.typePassword;
  }
}
