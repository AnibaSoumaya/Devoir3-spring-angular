import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  exclude_array: string[] = ['/login', '/register', '/verifyEmail'];

  constructor(private authService: AuthService) {}

  private toExclude(url: string): boolean {
    return this.exclude_array.some(excludePath => url.includes(excludePath));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.toExclude(request.url)) {
      const jwt = this.authService.getToken();
      const reqWithToken = request.clone({
        setHeaders: { Authorization: `Bearer ${jwt}` }
      });
      return next.handle(reqWithToken);
    }
    return next.handle(request);
  }
}
