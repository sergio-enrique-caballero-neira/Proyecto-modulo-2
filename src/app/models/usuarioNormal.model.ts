/**
 * @interface UsuarioNormalModel
 * @description Define la estructura de datos de un Usuario Normal del sistema.
 * El usuario Normal es el tipo base: puede crear y enviar cartas y paquetes,
 * pero no accede a descuentos automáticos ni tiene métricas de pedidos.
 */
export interface UsuarioNormalModel {

  /** Identificador único del usuario generado por el backend. */
  id: number;

  /** Número de cédula de identidad del usuario. */
  cedula: number;

  /** Nombre completo del usuario. */
  nombre: string;

  /** Correo electrónico del usuario. */
  email: string;

  /** Número de teléfono de contacto del usuario. */
  telefono: number;

  /** Edad del usuario. */
  edad: number;

  /** Dirección de residencia del usuario. */
  direccion: string;

  /**
   * Tipo de usuario. Valor esperado: 'NORMAL'.
   * Permite al sistema identificar la categoría del usuario sin instanciar el objeto completo.
   */
  tipoUsuario: string;

  /** Contraseña del usuario para acceso al sistema. */
  contrasena: string;

}
