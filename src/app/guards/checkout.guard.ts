import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';

export const checkoutGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

  const cartService = inject(CartService);

  if (cartService.cart) { 
    const confirmation = confirm('Sei sicuro di uscire dal carrello?');
    return confirmation;
  }

  return true;
};
