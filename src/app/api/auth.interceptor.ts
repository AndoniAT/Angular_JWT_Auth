import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private readonly refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>( null );

  constructor( readonly authService: AuthService, readonly router: Router ) {}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getAccessToken(); // Récupère le token

    if ( token ) {
      authReq = this.addToken( req, token );
    }

    return next.handle(authReq).pipe(
      catchError( ( error: HttpErrorResponse ) => {
        if ( error.status === 403 || error.status === 401 ) {
          return this.handle401Error( req, next );
        }
        return throwError( () => error );
      } )
    );
  }

  private addToken( req: HttpRequest<any>, token: string ) {
    return req.clone( {
      setHeaders: { Authorization: `Bearer ${token}` },
    } );
  }

  private handle401Error( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if ( !this.isRefreshing ) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next( null ); // Try to refresh token

      return this.authService.refreshToken().pipe(
        switchMap( ( res: { accessToken:string } ) => {
          const { accessToken } = res;
          this.isRefreshing = false;
          this.refreshTokenSubject.next( accessToken ); // Update subject with new token
          return next.handle( this.addToken( req, accessToken ) ); // Continue req with new token
        }),
        catchError( ( err ) => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigateByUrl( '/' ).then(() => {
            location.replace( location.href ); // Replace current url by the same to revalidate
          });
          return throwError( () => err );
        } )
      );
    } else {
      //If we have already started a refresh attempt,
      // we wait until the token is available
      return new Observable<HttpEvent<any>>( ( observer:any ) => {

        const interval = setInterval( () => {
          const token = this.refreshTokenSubject.getValue();

          if ( token ) {
            clearInterval( interval );
            next.handle( this.addToken( req, token ) ).subscribe( observer );
          }
        }, 100 ); // Regular wait to check if a token has been obtained
      });
    }
  }
}
