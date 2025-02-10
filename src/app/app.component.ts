import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_SETTINGS, appSettings } from './app.settings';
import { CopyrightDirective } from './directives/copyright.directive';
import { ProductListComponent } from './product-list/product-list.component';
import { Observable, of, from } from 'rxjs';
import { KeyLoggerComponent } from '../key-logger/key-logger.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, CopyrightDirective, KeyLoggerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent {
  title = 'App';
  settings = inject(APP_SETTINGS);
  title$ = new Observable<string>(observer => {
    setInterval(() => {
      observer.next(this.title);
    }, 1000);
  });


  constructor() {
    //this.onComplete().then(this.setTitle);
    this.title$.subscribe(this.setTitle);
    const values = of(1, 2, 3);
    values.subscribe(value => console.log(value));

    const complete$ = from(this.onComplete());
    complete$.subscribe((value) => this.setTitle);
  }

  private setTitle = () => {
    const timestamp = new Date();
    this.title = `${this.settings.title} - (${timestamp})`;
  };

  private changeTitle(callback: Function) {
    setTimeout(() => {
      callback();
    }, 2000);
  }

  private onComplete() {
    return new Promise<void>((resolve) => {
      setInterval(() => {
        resolve();
      }, 2000);
    });
  }

}
