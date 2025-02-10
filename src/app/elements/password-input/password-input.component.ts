import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PasswordInputType } from './password-input.interface';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { heroEye } from '@ng-icons/heroicons/outline';
import { featherAirplay } from '@ng-icons/feather-icons';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  imports: [NgIcon, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
  viewProviders: [provideIcons({ featherAirplay, heroEye })],
})
export class PasswordInputComponent {
  _password!:PasswordInputType;
  typePassword = false;

  err = '';
  errorClass=''

  @Input() set password(pwd: PasswordInputType) {
    this._password = pwd;
    console.log("check", this._password);
    this.errorClass = this._password?.err ? "error-message" : "offscreen";
    this.err = this._password?.err ?? this._password.errMsg ?? '';
  }

  setTypePassword() {
    this.typePassword = !this.typePassword;
  }
}
