import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  pageSelect: boolean = true;
  @ViewChild('nav-toggle') toggle!: ElementRef<HTMLDivElement>;

  @ViewChild('nav-menu') nav!: ElementRef<HTMLDivElement>;

  constructor(private readonly _elRef: ElementRef) {}

  ngOnInit() {
    const toggle = this._elRef.nativeElement.querySelector(
      '#nav-toggle'
    ) as HTMLDivElement;
    const nav = this._elRef.nativeElement.querySelector(
      '#nav-menu'
    ) as HTMLDivElement;
    
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show-menu');
      toggle.classList.toggle('show-icon');
    });
  
  }
}
