import { inject } from '@angular/core';
import { CanActivateFn, CanMatch, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn | CanMatch = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.parseUrl('/');
  }

  return true;
};
