import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);

    if (decoded.role !== 'admin') {
      router.navigate(['/']);
      return false;
    }

    return true;

  } catch {
    router.navigate(['/']);
    return false;
  }
};