import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoftyInterceptor } from './lofty.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoftyInterceptor, multi: true },
];