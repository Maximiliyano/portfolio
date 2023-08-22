import { trigger, transition, animate, state, style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('slideIn', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate('500ms ease-in')
      ])
    ])
  ]
})
export class SkillsComponent {


  constructor() {
  }
}
