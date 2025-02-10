import { Component, computed, inject, signal, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_SETTINGS, appSettings } from './app.settings';
import { CopyrightDirective } from './directives/copyright.directive';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AuthComponent,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
}
