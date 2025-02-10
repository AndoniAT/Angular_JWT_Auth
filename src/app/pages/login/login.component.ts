import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroEye } from '@ng-icons/heroicons/outline';
import axios from '../../api/axios';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  viewProviders: [provideIcons({ featherAirplay, heroEye })],
})
export class LoginComponent {
  
  typePassword = true;
  error = "";
  
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  handleSubmit() {
    console.log(
      this.profileForm.value.username + ' | ' + this.profileForm.value.password
    );

    const user = {
      username : this.profileForm.value.username,
      password: this.profileForm.value.password
    };

    axios.post( "auth/login", user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    } )
    .then( res => {
        const { data } = res;
        const { accessToken } = data;
        console.log( 'Access token', accessToken );
      } )
      .catch( err => {
          const message = err.response.data.message ?? "Login failed";
          console.log( "Error", message );
          
          if( !err.response ) {
              this.error = "No server response";
              return;
          }

          this.error = message;
      } );
  }

  setTypePassword() {
    this.typePassword = !this.typePassword;
  }
}
