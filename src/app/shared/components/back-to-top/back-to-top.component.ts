import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
})
export class BackToTopComponent implements AfterViewInit {
  constructor(
    private readonly _elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const aElement = this._elRef.nativeElement.querySelector(
        '.btn-scroll-top'
      ) as HTMLAnchorElement;

      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          aElement.classList.add('show-btn-scroll-top');
        } else {
          aElement.classList.remove('show-btn-scroll-top');
        }
      });

      aElement.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }
  }
}
