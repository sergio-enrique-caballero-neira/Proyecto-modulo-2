/**
 * @interface UsuarioConcurrenteModel
 * @description Define la estructura de datos de un Usuario Concurrente del sistema.
 * El usuario Concurrente es aquel que realiza envíos con alta frecuencia mensual
 * y por ello accede a descuentos calculados en función de su volumen de pedidos.
 * Extiende el perfil base de usuario con los campos exclusivos
 * `pedidosMensuales` y `descuento`.
 */
export interface UsuarioConcurrenteModel {

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
   * Tipo de usuario. Valor esperado: 'CONCURRENTE'.
   * Permite al sistema identificar la categoría del usuario sin instanciar el objeto completo.
   */
  tipoUsuario: string;

  /** Contraseña del usuario para acceso al sistema. */
  contrasena: string;

  /** Porcentaje de descuento aplicado al usuario por su volumen de pedidos mensuales. */
  descuento: number;

  /** Número de pedidos realizados por el usuario en el mes actual. */
  pedidosMensuales: number;

}
