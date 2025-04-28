import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { LoginService } from '../../shared/services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);


  return loginService
  .checkAuthStatus()
  .pipe(
    take(1),
    map(() => {
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  )
};
