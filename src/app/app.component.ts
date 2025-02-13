import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import { CartService } from './services/cart.service';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AuthComponent,
    RouterLinkActive,
    RouterLink,
    MatToolbar,
    MatToolbarRow,
    MatButtonModule,
    MatBadge,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
  cartService = inject(CartService);
}
