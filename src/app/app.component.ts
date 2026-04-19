import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent }   from './components/navbar/navbar.component';
import { HeroComponent }     from './components/hero/hero.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent }  from './components/contact/contact.component';
import { FooterComponent }   from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    BenefitsComponent,
    ProductsComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-benefits />
      <app-products />
      <app-contact />
    </main>
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
