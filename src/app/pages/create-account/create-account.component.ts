import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { heroEye } from '@ng-icons/heroicons/outline';
import { UsersService } from '../../services/users/users.service';
import { CreateAccountAttributesType, UserCreateType } from '../../interfaces/user';

@Component( {
  selector: 'app-create-account',
  imports: [ RouterLink, ReactiveFormsModule, NgIcon, CommonModule ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
  viewProviders: [ provideIcons( { heroEye } ) ],
} )
export class CreateAccountComponent {
  typePassword = true;
  typeConfirmPassword = true;

  successMsg = "";

  errMsg = {
    gral: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  profileForm = new FormGroup( {
      username: new FormControl( '', Validators.required),
      firstname: new FormControl( '', Validators.required ),
      lastname: new FormControl( '', Validators.required ),
      email: new FormControl( '', [ Validators.required, Validators.email] ),
      password: new FormControl( '', Validators.required ),
      confirmPassword: new FormControl( '', Validators.required )
  } );

  readonly attributes = [
    CreateAccountAttributesType.username,
    CreateAccountAttributesType.firstname,
    CreateAccountAttributesType.lastname,
    CreateAccountAttributesType.email,
    CreateAccountAttributesType.password,
    CreateAccountAttributesType.confirmPassword
  ] as CreateAccountAttributesType[];

  constructor( private userService:UsersService, private router: Router ) {

  }

  createAccount() {
    this.cleanErrors();
    let err = this.detectFormErrors();

    if( err ) return;

    const {
      username, firstname, lastname,
      email, password, confirmPassword
    } = this.profileForm.value;

    const user = {
      username, firstname, lastname, email, password, confirmPassword
    } as UserCreateType;
    
    this.userService.createUser( user )
    .subscribe( {
        next: () => {
          let count = 6;

          setInterval( () => {
            count--;
            this.successMsg = "User created, you will be redirected to login page in... " + count;
            if( count <= 0 ) {
              this.router.navigateByUrl('/login').then(() => {
                location.replace( location.href );
              });
            }
          }, 1000 )
        },
        error: ( err:any ) => {
          this.detectHttpErrors( err?.error?.message );
        }
    } );
  }

  detectFormErrors() {
    let err = false;
    for( let attr of this.attributes ) {
      if( !this.profileForm.get( attr )?.errors ) continue;

      err = true;
      const val = this.profileForm.get( attr ) as { errors: any };
      const { errors } = val;
      
      if( errors.email ) {
        errors.email = "Email should be a valid email"
      }

      if( errors.required ) {
        errors.required = "A value is required"
      }

      this.errMsg[ attr ] = `Error ${attr} : ${Object.values( errors ).join('\n -')}`;
    }
    return err;
  }

  detectHttpErrors( error:any ) {
    let err = false;
    
    if( !error ) {
      err = true;
      this.errMsg.gral ="No server response";
      return err;
    }

    for( let attr of this.attributes ) {
      if( !error[ attr ] ) continue;
      const { message } = error[attr];
      err = true;
      this.errMsg[ attr ] = `Error ${attr} : ${message}`;
    }
    return err;
  }

  cleanErrors() {
    this.errMsg.gral = "";

    for( let attr of this.attributes ) {
      this.errMsg[ attr ] = "";
    }
  }

  changeTypePassword() {
    this.typePassword = !this.typePassword;
  }

  changeTypeConfirmPassword() {
    this.typeConfirmPassword = !this.typeConfirmPassword;
  }
}
