import {
  ChangeDetectionStrategy, Component, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductCategory } from '../../models/product.interface';
import { fadeInStagger, fadeInUp } from '../../animations/animations';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeInStagger, fadeInUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  // ✅ inject() — DI moderna sem construtor
  readonly productService = inject(ProductService);

  // ✅ Exposição direta dos signals do service
  readonly filteredGroups  = this.productService.filteredGroups;
  readonly activeFilter    = this.productService.activeFilter;

  setFilter(filter: ProductCategory | 'all'): void {
    this.productService.setFilter(filter);
  }

  // ✅ trackBy function — evita re-render desnecessário de cards
  trackByProduct(_: number, product: { id: number }): number {
    return product.id;
  }

  trackByGroup(_: number, group: { title: string }): string {
    return group.title;
  }
}
