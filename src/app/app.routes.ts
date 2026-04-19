import { Routes } from '@angular/router';

// Landing page sem sub-rotas — estrutura preparada para escalar
export const routes: Routes = [
  { path: '', loadComponent: () =>
      import('./app.component').then(m => m.AppComponent) },
  { path: '**', redirectTo: '' },
];
