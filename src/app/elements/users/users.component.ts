import { Component, Input } from '@angular/core';
import { UserAdminActionsType, UserType } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-users',
  imports: [CommonModule, NgIcon],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  viewProviders: [provideIcons({ heroPencilSquare, heroTrash })],
})
export class UsersComponent {
  @Input() users !: UserAdminActionsType[];
  @Input() errMsg : string = "";

  constructor() {
    console.log('check users', this.users);
  }
}
