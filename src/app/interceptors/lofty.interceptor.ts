import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class LoftyInterceptor implements HttpInterceptor {

  readonly token: string = ''

  constructor() {
    if (window.localStorage.getItem('auth')) {
      this.token = window.localStorage.getItem('auth')!
    } else {
      this.token = window.sessionStorage.getItem('auth')!
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const reqHeaders = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.token,
      }
    });
    
    return next.handle(reqHeaders);
  }
}
