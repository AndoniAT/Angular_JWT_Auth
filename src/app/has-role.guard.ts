import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

export const hasRoleGuard: CanActivateFn = ( route, state ) => {
  const router: Router = inject( Router );
  const authService : AuthService = inject( AuthService );
  const userRole = authService.getSessionRoles();
  const expectedRoles: number[] = route.data['roles'];

  const hasRole: boolean = expectedRoles.some( ( role ) => userRole.includes( role ) );

  return hasRole || router.navigate( ['unauthorized'] );
};

export const isNotConnected: CanActivateFn = ( route, state ) => {
  const router: Router = inject( Router );
  const authService : AuthService = inject( AuthService );
  const user = authService.getUserLogged();
  const notConnected = !user;
  return notConnected || router.navigateByUrl( '/' );
}