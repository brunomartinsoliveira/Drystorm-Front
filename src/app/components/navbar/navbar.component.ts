import {
  ChangeDetectionStrategy, Component, signal, HostListener
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { slideDown } from '../../animations/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [slideDown],
  // OnPush — só re-renderiza quando inputs/signals mudam
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  menuOpen = signal(false);
  scrolled = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  // HostListener — detecta scroll para mudar estilo do navbar
  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 60);
  }
}
