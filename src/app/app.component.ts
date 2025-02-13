import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AuthComponent,
    RouterLinkActive,
    RouterLink,
    MatToolbar,
    MatToolbarRow,
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
}
