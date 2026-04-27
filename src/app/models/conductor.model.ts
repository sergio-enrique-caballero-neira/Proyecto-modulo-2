/**
 * @interface ConductorModel
 * @description Define la estructura de datos de un Conductor del sistema.
 * El conductor es el personal encargado del transporte y entrega de envíos.
 * Comparte los campos laborales comunes con Administrador y Manipulador,
 * pero agrega campos exclusivos relacionados con su actividad de transporte:
 * `licencia`, `tipoVehiculo` y `experienciaAnios`.
 */
export interface ConductorModel {

  /** Identificador único del conductor generado por el backend. */
  id: number;

  /** Número de cédula de identidad del conductor. */
  cedula: number;

  /** Nombre completo del conductor. */
  nombre: string;

  /** Correo electrónico del conductor. */
  email: string;

  /** Número de teléfono de contacto del conductor. */
  telefono: number;

  /** Edad del conductor. */
  edad: number;

  /** Hora de inicio del turno laboral. */
  inicioTurno: string;

  /** Hora de fin del turno laboral. */
  finalTurno: string;

  /** Salario del conductor. */
  salario: number;

  /** Número o categoría de la licencia de conducción del conductor. */
  licencia: string;

  /** Tipo de vehículo asignado al conductor para realizar entregas. */
  tipoVehiculo: string;

  /** Años de experiencia del conductor en el área de transporte. */
  experienciaAnios: number;

  /** Contraseña del conductor para acceso al sistema. */
  contrasena: string;

}
