/**
 * @interface PaqueteAlimenticioModel
 * @description Define la estructura de datos de un Paquete Alimenticio en el sistema de envíos.
 * Se diferencia del paquete no alimenticio en que incluye el campo `refrigerado`,
 * que indica si el contenido requiere cadena de frío durante el transporte.
 */
export interface PaqueteAlimenticioModel {

  /** Identificador único del paquete generado por el backend. */
  id: number;

  /** Descripción del contenido alimenticio del paquete. */
  descripcion: string;

  /** Peso del paquete.*/
  peso: number;

  /** Ciudad o dirección de origen del envío. */
  origen: string;

  /** Ciudad o dirección de destino del envío. */
  destino: string;

  /** Fecha programada de envío en formato string. */
  fechaEnvio: string;

  /**
   * Indica si el paquete requiere cadena de frío (refrigeración) durante el transporte.
   * Si es true, el conductor y manipulador deben garantizar condiciones de temperatura controlada.
   */
  refrigerado: boolean;

}
