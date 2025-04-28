import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private destroyRef = inject(DestroyRef);
  private refreshTokenSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private _loginService: LoginService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneRequest = req.clone({
      withCredentials: true,
    });

    return next.handle(cloneRequest).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !cloneRequest.url.includes('auth/refresh-token') &&
          !cloneRequest.url.includes('auth/check')
        ) {
          return this.handle401Error(cloneRequest, next);
        }
        return throwError(() => error);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this._loginService.refreshToken())
    .pipe(
      switchMap(() => {
        return next.handle(request);
      }),
      catchError((error) => {
        if (error.status == 403) {
          this.redirectLogout();
        }
        return throwError(() => error);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  private redirectLogout(){
    this._loginService
    .logout()
    .subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => {
        return throwError(() => error)
      }
    })
  }
}
