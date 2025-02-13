import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';

export const checkoutGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const cartService = inject(CartService);

  if (cartService.cart) {
    const dialog = inject(MatDialog);

    if (cartService.cart) {
      const confirmation = dialog
        .open(CheckoutComponent, { data: cartService.cart.products.length })
        .afterClosed();
      return confirmation;
    }
  }

  return true;
};
