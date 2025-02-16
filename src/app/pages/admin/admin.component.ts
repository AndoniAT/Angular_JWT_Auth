import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { UserAdminActionsType, UserType } from '../../interfaces/user';
import { UsersComponent } from '../../elements/users/users.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, UsersComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users : UserAdminActionsType[] = [];
  error : string = "";

  constructor( readonly usersService: UsersService, readonly router: Router ) {
    usersService.getAllUsers()
    .subscribe( {
      next: ( data:UserType[] ) => {
        if( data.length === 0 ) {
          return;
        }

        let _data = data.map( ( user:UserType ) => {
          let us = {
            ...user,
            modify: () => this.modifyUser( user.username ),
            delete: () => this.deleteUser( user._id )
          } as UserAdminActionsType;

          return us;
        } );

        this.users = _data;
      },
      error: console.error
    })
  }

  modifyUser( username:string|undefined ) {
    if( !username ) return;
    this.router.navigateByUrl( `/profile/${username}` );
  }

  deleteUser( id:string|undefined ) {
    if( !id ) return;
    this.usersService.deleteUser( id )
    .subscribe({
      next: () => {
        this.users = this.users.filter( us => us._id != id );
      },
      error: ( err:any ) => {
        this.detectHttpErrors( err?.error?.message );
      }
    })
  }

  detectHttpErrors( error:string|undefined ) {
    if( error === undefined ) {
      this.error = 'No server response';
    }

    if( typeof error === 'string' ) {
      this.error = error;
    }
  }
}
