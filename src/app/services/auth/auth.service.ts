import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AccesTokenDecodedType, AuthUserType, RolesType } from '../../interfaces/auth';
import { jwtDecode } from "jwt-decode";

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor( readonly http: HttpClient ) { 
  }

  login( username:string, password:string ) : Observable<any> {
    const user = {
      username,
      password
    };
    return this.http.post( `${environment.BACK_END_URL}auth/login` , user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        } )
  }

  logout() : Observable<any> {
    localStorage.removeItem('token');
    return this.http.get( `${environment.BACK_END_URL}auth/logout` , {
      withCredentials: true
    } );
  }

  getAccessToken() {
    return localStorage.getItem( 'token' );
  }

  getUserLogged() : AuthUserType {
    const token = this.getAccessToken();
    const decoded = token ? jwtDecode<AccesTokenDecodedType>( token ) : undefined;
    const user = decoded?.user as AuthUserType;
    return user;
  }

  getSessionRoles() {
    const user = this.getUserLogged();
    if( !user ) return [];

    return user.roles;
  }

  refreshToken() {
    return this.http.get(`${environment.BACK_END_URL}auth/token`, {
      withCredentials: true
    } ).pipe(
      tap( ( res:any ) => {
        let accessToken = res.accessToken;
        localStorage.setItem('token', accessToken );
      })
    );
  }

  isMe( username:string ) {
    const user = this.getUserLogged();
    return user.email == username || user.username == username;
  }

  imAdmin() {
    const user = this.getUserLogged();
    return user.roles.includes( AuthService.ROLES.admin );
  }

  static readonly ROLES : RolesType = {
    admin: 1000,
    user : 2000
  };

}
