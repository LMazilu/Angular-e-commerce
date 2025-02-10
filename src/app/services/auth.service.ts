import { computed, inject, Injectable, signal } from '@angular/core';
import { APP_SETTINGS } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AccessToken } from '../models/access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken = signal('');
  private authUrl = inject(APP_SETTINGS).apiUrl + '/auth';
  isLoggedIn = computed(() => this.accessToken() != '');

  constructor(private HttpClient: HttpClient) { }

  login(username: string, password: string): Observable<AccessToken> {
      return this.HttpClient.post<AccessToken>(this.authUrl + '/login', { username, password }).pipe(
        tap((accessToken) => {
          this.accessToken.set(accessToken.token);
        })
      );
  }

  logout(): void {
    this.accessToken.set('');
  }

  getToken() {
    return this.accessToken();
  }
}
