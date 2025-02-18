import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import { FeaturedComponent } from './featured/featured.component';
import { CartService } from './services/cart.service';
import { CopyrightDirective } from './directives/copyright.directive';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AuthComponent,
    FeaturedComponent,
    CopyrightDirective,
    RouterLinkActive,
    RouterLink,
    MatToolbar,
    MatToolbarRow,
    MatButtonModule,
    MatBadge,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
  cartService = inject(CartService);
  apiUrl = environment.apiUrl;
}
