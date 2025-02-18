import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[appCopyright]',
})
export class CopyrightDirective implements OnInit {
  private platform = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      const targetElement: HTMLElement = this.el.nativeElement;

      const currentYear = new Date().getFullYear();
      targetElement.classList.add('copyright');
      targetElement.textContent = `Copyright © ${currentYear} All rights reserved ${targetElement.textContent}`;
    }
  }
}
