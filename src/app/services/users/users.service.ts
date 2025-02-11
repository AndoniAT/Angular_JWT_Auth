import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserCreateType, UserType } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { 
  }

  getAllUsers() {
    return this.http.get( `${environment.BACK_END_URL}users`, {
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

  deleteUser( id:string ){
    return this.http.delete( `${environment.BACK_END_URL}users/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    } )
  }
}
