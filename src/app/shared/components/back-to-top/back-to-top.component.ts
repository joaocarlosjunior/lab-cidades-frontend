import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss',
})
export class BackToTopComponent implements AfterViewInit {
  constructor(private readonly _elRef: ElementRef) {}
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
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
