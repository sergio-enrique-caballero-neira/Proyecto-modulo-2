/**
 * @interface AdministradorModel
 * @description Define la estructura de datos de un Administrador del sistema.
 * El administrador es el rol con mayor nivel de acceso: puede gestionar
 * todo el personal (conductores, manipuladores, otros administradores)
 * y todas las entidades de envío (cartas, paquetes).
 *
 * Comparte los campos laborales comunes con Conductor y Manipulador
 * (turno, salario), pero agrega `rol` y `accesoTotal` como campos
 * exclusivos que determinan sus permisos dentro del sistema.
 */
export interface AdministradorModel {

  /** Identificador único del administrador generado por el backend. */
  id: number;

  /** Número de cédula de identidad del administrador. */
  cedula: number;

  /** Nombre completo del administrador. Usado también como credencial de login. */
  nombre: string;

  /** Correo electrónico del administrador. */
  email: string;

  /** Número de teléfono de contacto del administrador. */
  telefono: number;

  /** Edad del administrador. */
  edad: number;

  /** Hora de inicio del turno laboral. */
  inicioTurno: string;

  /** Hora de fin del turno laboral. */
  finalTurno: string;

  /** Salario del administrador. */
  salario: number;

  /** Contraseña del administrador para acceso al sistema. */
  contrasena: string;

  /**
   * Rol específico del administrador dentro del sistema.
   * Determina qué secciones del dashboard puede ver y gestionar.
   */
  rol: string;

  /**
   * Indica si el administrador tiene acceso total al sistema sin restricciones.
   * Si es true, puede gestionar cualquier entidad independientemente de su `rol`.
   */
  accesoTotal: boolean;

}
