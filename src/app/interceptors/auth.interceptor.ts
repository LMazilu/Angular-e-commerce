import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService} from '../services/auth.service';
import { inject } from '@angular/core';
import { AccessToken } from '../models/access-token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authReq = req.clone({
    headers: req.headers.set(
      'Authorization',
      'Bearer ' + authService.getToken()
    ),
  });
  return next(authReq);
};
