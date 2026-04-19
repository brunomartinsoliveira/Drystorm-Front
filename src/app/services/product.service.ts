import { Injectable, signal, computed } from '@angular/core';
import { Product, ProductGroup, ProductCategory } from '../models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Angular Signals para reatividade eficiente (Angular 17+)
  private _activeFilter = signal<ProductCategory | 'all'>('all');

  readonly activeFilter = this._activeFilter.asReadonly();

  readonly productGroups: ProductGroup[] = [
    {
      title: 'T-shirts Masculinas',
      icon: '👕',
      category: 'masculino',
      type: 'camiseta',
      products: [
        this.createProduct(1, 'Dryfit Clássica', 59.90, 'masculino', 'camiseta', 0),
        this.createProduct(2, 'Dryfit Training', 69.90, 'masculino', 'camiseta', 1, 'Mais Vendido'),
        this.createProduct(3, 'Dryfit Urban', 59.90, 'masculino', 'camiseta', 2),
        this.createProduct(4, 'Dryfit Storm', 69.90, 'masculino', 'camiseta', 3),
      ],
    },
    {
      title: 'Shorts Masculinos',
      icon: '🩳',
      category: 'masculino',
      type: 'short',
      products: [
        this.createProduct(5, 'Performance Fit', 109.90, 'masculino', 'short', 0),
        this.createProduct(6, 'Street Move', 129.90, 'masculino', 'short', 1, 'Novo'),
        this.createProduct(7, 'Storm Flex', 109.90, 'masculino', 'short', 2),
        this.createProduct(8, 'Runner Pro', 129.90, 'masculino', 'short', 3),
      ],
    },
    {
      title: 'Tops Femininos',
      icon: '👚',
      category: 'feminino',
      type: 'camiseta',
      products: [
        this.createProduct(9, 'Dryfit Feminina Fit', 79.90, 'feminino', 'camiseta', 0),
        this.createProduct(10, 'Dryfit Move', 79.90, 'feminino', 'camiseta', 1),
        this.createProduct(11, 'Dry Urban', 79.90, 'feminino', 'camiseta', 2, 'Destaque'),
        this.createProduct(12, 'Storm Lady', 79.90, 'feminino', 'camiseta', 3),
      ],
    },
    {
      title: 'Shorts Femininos',
      icon: '🩳',
      category: 'feminino',
      type: 'short',
      products: [
        this.createProduct(13, 'Flex Fit', 109.90, 'feminino', 'short', 0),
        this.createProduct(14, 'Dry Runner', 109.90, 'feminino', 'short', 1),
        this.createProduct(15, 'Urban Move', 109.90, 'feminino', 'short', 2),
        this.createProduct(16, 'Performance Lady', 109.90, 'feminino', 'short', 3, 'Novo'),
      ],
    },
  ];

  // computed() — recalcula apenas quando o signal muda
  readonly filteredGroups = computed(() => {
    const filter = this._activeFilter();
    if (filter === 'all') return this.productGroups;
    return this.productGroups.filter(g => g.category === filter);
  });

  setFilter(filter: ProductCategory | 'all'): void {
    this._activeFilter.set(filter);
  }

  getAllProducts(): Product[] {
    return this.productGroups.flatMap(g => g.products);
  }

  private createProduct(
    id: number,
    name: string,
    price: number,
    category: ProductCategory,
    type: 'camiseta' | 'short',
    variant: number,
    badge?: string
  ): Product {
    return {
      id,
      name,
      price,
      image: this.createProductImage(name, category, type, variant),
      category,
      type,
      badge,
    };
  }

  private createProductImage(
    name: string,
    category: ProductCategory,
    type: 'camiseta' | 'short',
    variant: number
  ): string {
    const palette = [
      { garment: '#102a56', detail: '#dbe7ff', background: '#0b1220' },
      { garment: '#19376d', detail: '#8fb3ff', background: '#0f1728' },
      { garment: '#254785', detail: '#f5f8ff', background: '#101a30' },
      { garment: '#0f274d', detail: '#6f95df', background: '#0b1424' },
    ][variant % 4];

    const fitLabel = category === 'masculino' ? 'MASCULINO' : 'FEMININO';
    const garmentSvg = type === 'camiseta'
      ? `
        <path d="M242 245 L320 180 L480 180 L558 245 L612 214 L666 330 L584 386 L540 308 L540 782 L260 782 L260 308 L216 386 L134 330 L188 214 Z"
          fill="${palette.garment}" stroke="#ffffff20" stroke-width="8"/>
        <path d="M352 180 C352 136 448 136 448 180" fill="none" stroke="${palette.detail}" stroke-width="18" stroke-linecap="round"/>
        <path d="M302 410 H498" stroke="${palette.detail}" stroke-width="14" stroke-linecap="round" opacity="0.9"/>
        <path d="M332 470 H468" stroke="${palette.detail}" stroke-width="10" stroke-linecap="round" opacity="0.75"/>
      `
      : `
        <path d="M286 214 H514 L566 322 L520 792 H410 L392 470 H408 L390 792 H280 L234 322 Z"
          fill="${palette.garment}" stroke="#ffffff20" stroke-width="8"/>
        <path d="M286 214 H514" stroke="${palette.detail}" stroke-width="14" stroke-linecap="round"/>
        <path d="M400 322 V792" stroke="${palette.detail}" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
        <path d="M286 522 H514" stroke="${palette.detail}" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
      `;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="${name}">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${palette.background}"/>
            <stop offset="100%" stop-color="#05070d"/>
          </linearGradient>
          <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff16"/>
            <stop offset="100%" stop-color="#ffffff00"/>
          </linearGradient>
        </defs>
        <rect width="800" height="1000" rx="36" fill="url(#bg)"/>
        <circle cx="654" cy="156" r="118" fill="#ffffff08"/>
        <circle cx="152" cy="844" r="140" fill="#5f87d81a"/>
        <rect x="72" y="72" width="656" height="856" rx="30" fill="url(#shine)" stroke="#ffffff12"/>
        ${garmentSvg}
        <text x="400" y="110" text-anchor="middle" fill="#f7faff" font-size="30" font-family="Arial, sans-serif" letter-spacing="6">DRYSTORM</text>
        <text x="400" y="858" text-anchor="middle" fill="#dbe7ff" font-size="28" font-family="Arial, sans-serif" font-weight="700">${name.toUpperCase()}</text>
        <text x="400" y="898" text-anchor="middle" fill="#8ca8dc" font-size="20" font-family="Arial, sans-serif" letter-spacing="4">${fitLabel} ${type.toUpperCase()}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
}
