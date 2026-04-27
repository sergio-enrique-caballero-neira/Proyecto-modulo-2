import { Component, signal } from '@angular/core';

/**
 * @component App
 * @description Componente raíz de la aplicación de paquetería.
 * Actúa como punto de entrada del árbol de componentes Angular;
 * contiene el `<router-outlet>` en su plantilla, que es el contenedor
 * donde el enrutador inyecta dinámicamente el componente asociado
 * a la ruta activa (Login, Register, AdminDashboard, UsuariosDashboard, etc.).
 *
 * @selector app-root
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {

  /** Título de la aplicación expuesto como señal reactiva de Angular. */
  protected readonly title = signal('MiPrimerAngular');
}
