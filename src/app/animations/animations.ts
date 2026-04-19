import {
  trigger, transition, style, animate,
  query, stagger, state
} from '@angular/animations';

// Animação de entrada com stagger — cards entram em cascata
export const fadeInStagger = trigger('fadeInStagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      stagger(80, [
        animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

// Animação para card individual
export const cardHover = trigger('cardHover', [
  state('default', style({ transform: 'scale(1)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' })),
  state('hovered', style({ transform: 'scale(1.03)', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' })),
  transition('default <=> hovered', animate('200ms ease')),
]);

// Fade simples para seções
export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(40px)' }),
    animate('500ms 100ms cubic-bezier(0.35, 0, 0.25, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

// Slide do navbar no mobile
export const slideDown = trigger('slideDown', [
  transition(':enter', [
    style({ height: 0, opacity: 0, overflow: 'hidden' }),
    animate('250ms ease', style({ height: '*', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease', style({ height: 0, opacity: 0 }))
  ])
]);
