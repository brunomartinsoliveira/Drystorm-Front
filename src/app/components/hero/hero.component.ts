import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInUp } from '../../animations/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
