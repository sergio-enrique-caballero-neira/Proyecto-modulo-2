/**
 * @interface ManipuladorModel
 * @description Define la estructura de datos de un Manipulador del sistema.
 * El manipulador es el personal encargado del procesamiento físico de paquetes
 * y cartas en bodega antes de ser despachados. Comparte los campos laborales
 * comunes con Administrador y Conductor, pero agrega campos exclusivos:
 * `area` y `paquetesProcesados`.
 */
export interface ManipuladorModel {

  /** Identificador único del manipulador generado por el backend. */
  id: number;

  /** Número de cédula de identidad del manipulador. */
  cedula: number;

  /** Nombre completo del manipulador. */
  nombre: string;

  /** Correo electrónico del manipulador. */
  email: string;

  /** Número de teléfono de contacto del manipulador. */
  telefono: number;

  /** Edad del manipulador. */
  edad: number;

  /** Hora de inicio del turno labora. */
  inicioTurno: string;

  /** Hora de fin del turno laboral. */
  finalTurno: string;

  /** Salario del manipulador. */
  salario: number;

  /** Área o zona de trabajo asignada al manipulador dentro de la bodega. */
  area: string;

  /** Cantidad de paquetes procesados por el manipulador. */
  paquetesProcesados: number;

  /** Contraseña del manipulador para acceso al sistema. */
  contrasena: string;

}
