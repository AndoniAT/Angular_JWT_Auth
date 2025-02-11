import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserCreateType, UserType } from '../../interfaces/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( readonly http: HttpClient, readonly authService: AuthService ) {
  }

  getAllUsers() {
    return this.http.get( `${environment.BACK_END_URL}users`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        } )
  }

  getUser( username:string ) {
    return this.http.get( `${environment.BACK_END_URL}users/${username}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    } )
  }

  createUser( user:UserCreateType ) {
    return this.http.post( `${environment.BACK_END_URL}users`, user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    } );
  }

  updateUser( username:string, user:UserType ) {
    return this.http.put( `${environment.BACK_END_URL}users/${username}`, user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    } );
  }

  deleteUser( id:string ){
    return this.http.delete( `${environment.BACK_END_URL}users/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    } )
  }

  isAdmin( roles:number[] ) {
    return roles.includes( AuthService.ROLES.admin );
  }
}
