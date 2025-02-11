import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { UserAdminActionsType, UserType } from '../../interfaces/user';
import { UsersComponent } from '../../elements/users/users.component';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, UsersComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users : UserAdminActionsType[] = [];

  constructor(readonly usersService: UsersService) {
    usersService.getAllUsers()
    .subscribe({
      next: ( data:UserType[] ) => {
        if( data.length === 0 ) {
          return;
        }

        let _data = data.map( ( user:UserType ) => {
          let us = {
            ...user,
            modify: () => this.modifyUser( user._id ),
            delete: () => this.deleteUser( user._id )
          } as UserAdminActionsType;

          return us;
        });

        this.users = _data;
      },
      error: console.error
    })
  }

  modifyUser( id:string|undefined ) {
    if( !id ) return;
    console.log("Update :", id);
  }

  deleteUser( id:string|undefined ) {
    if( !id ) return;

    this.usersService.deleteUser( id )
    .subscribe({
      next: () => {
        this.users = this.users.filter( us => us._id != id );
      },
      error: console.error
    })
  }
}
