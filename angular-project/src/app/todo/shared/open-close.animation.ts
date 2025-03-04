import { trigger, transition, style, animate } from '@angular/animations';

export const openCloseAnimation = [
  trigger('openClose', [
    transition(':enter', [
      style({opacity: 0}),
      animate('500ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('0ms', style({opacity: 0}))
    ])
  ])
];
