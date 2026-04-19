import {
  ChangeDetectionStrategy, Component, Input, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { CurrencyBrPipe } from '../../pipes/currency-br.pipe';
import { cardHover } from '../../animations/animations';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyBrPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [cardHover],
  // ✅ OnPush — card só re-renderiza se o @Input product mudar
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  hoverState = signal<'default' | 'hovered'>('default');
  imageLoaded = signal(false);

  onMouseEnter(): void { this.hoverState.set('hovered'); }
  onMouseLeave(): void { this.hoverState.set('default'); }
  onImageLoad():  void { this.imageLoaded.set(true); }
}
