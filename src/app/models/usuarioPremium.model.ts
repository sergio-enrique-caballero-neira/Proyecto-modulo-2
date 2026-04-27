/**
 * @interface UsuarioPremiumModel
 * @description Define la estructura de datos de un Usuario Premium del sistema.
 * El usuario Premium accede a un descuento fijo asignado directamente
 * por el administrador, independientemente del volumen mensual de pedidos.
 * A diferencia del usuario Concurrente, su descuento no es dinámico
 * sino que se establece manualmente en su perfil.
 */
export interface UsuarioPremiumModel {

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
   * Tipo de usuario. Valor esperado: 'PREMIUM'.
   * Permite al sistema identificar la categoría del usuario sin instanciar el objeto completo.
   */
  tipoUsuario: string;

  /** Contraseña del usuario para acceso al sistema. */
  contrasena: string;

  /** Porcentaje de descuento fijo asignado al usuario por su membresía Premium. */
  descuento: number;

}
