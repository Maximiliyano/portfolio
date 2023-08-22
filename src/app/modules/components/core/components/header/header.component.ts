import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuAnimation', [
      state('expanded', style({ transform: 'rotate(180deg)'})),
      state('closed', style({ transform: 'rotate(0)' })),
      transition('expanded <=> closed', animate('0.3s ease'))
    ]),
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateX(15px)' })),
      transition(':enter, :leave', [animate('0.4s ease-in-out')]),
    ]),
    trigger('headerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20%)' }),
        animate('0.9s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  public isMenuExpanded = false;
  public isSticky = false;

  public ngOnInit() {
    this.checkScroll();
  }

  public toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  @HostListener('window:scroll', ['$event'])
  public checkScroll() {
    this.isSticky = window.pageYOffset >= 100;
  }
}
