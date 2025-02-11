import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { UserType } from '../../interfaces/user';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users : UserType[] = [];

  constructor(readonly usersService: UsersService) {
    usersService.getAllUsers()
    .subscribe({
      next: ( data:UserType[] ) => {
        this.users = data;
      },
      error: console.error
    })
  }
}
