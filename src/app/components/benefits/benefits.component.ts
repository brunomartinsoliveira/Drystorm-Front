import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInStagger, fadeInUp } from '../../animations/animations';

interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss'],
  animations: [fadeInStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenefitsComponent {
  readonly benefits: Benefit[] = [
    { icon: '💧', title: 'Secagem Rápida',    desc: 'O tecido dryfit expele o suor e seca até 3x mais rápido que o algodão.' },
    { icon: '🌬️', title: 'Respirabilidade',   desc: 'Micro-poros garantem circulação de ar constante durante o treino.' },
    { icon: '🏋️', title: 'Alta Performance',  desc: 'Elasticidade 4-way stretch que acompanha cada movimento do seu corpo.' },
    { icon: '🛡️', title: 'Anti-Odor',         desc: 'Tratamento especial inibe o crescimento de bactérias e mau cheiro.' },
    { icon: '☀️', title: 'Proteção UV',        desc: 'Filtro solar UPF 50+ integrado ao tecido para treinos ao ar livre.' },
    { icon: '♻️', title: 'Material Sustentável', desc: 'Produzido com fibras recicladas, menos impacto, mais performance.' },
  ];
}
