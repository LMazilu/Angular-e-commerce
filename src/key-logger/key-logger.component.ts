import { Component, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-key-logger',
  imports: [],
  templateUrl: './key-logger.component.html',
  styleUrl: './key-logger.component.css',
})
export class KeyLoggerComponent implements OnInit {
  keyInput = viewChild<ElementRef>('keyContainer');
  keys = '';
  numeric = input(false);

  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(
      this.keyInput()!.nativeElement,
      'keyup'
    )
      .pipe(
        map((event: KeyboardEvent) => event.key),
        map((key: string) => key.charCodeAt(0)),
        filter((charCode: number) => {
          if (this.numeric()) {
            return (charCode > 31 && (charCode < 48 || charCode > 57)) === false;
          }
          return true;
        }),
        map((charCode) => String.fromCharCode(charCode)),
        tap((key) => (this.keys += key))
      )
      .subscribe();
  }
}
