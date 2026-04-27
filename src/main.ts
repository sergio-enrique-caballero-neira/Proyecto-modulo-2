import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

/**
 * @file main.ts
 * @description Punto de entrada de la aplicación Angular de paquetería.
 * Invoca `platformBrowser().bootstrapModule(AppModule)` para inicializar
 * la plataforma del navegador y arrancar el módulo raíz `AppModule`.
 * Cualquier error durante el arranque es capturado y registrado en consola.
 */
platformBrowser().bootstrapModule(AppModule, {

})
  .catch(err => console.error(err));
