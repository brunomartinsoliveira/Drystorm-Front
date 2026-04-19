import { ApplicationConfig }           from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideAnimations }            from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes }                       from './app.routes';

// Configuração moderna sem NgModule
export const appConfig: ApplicationConfig = {
  providers: [
    // Roteamento com PreloadAllModules — módulos lazy carregam em background
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Habilita @angular/animations globalmente
    provideAnimations(),

    // HttpClient pronto para uso com inject()
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
