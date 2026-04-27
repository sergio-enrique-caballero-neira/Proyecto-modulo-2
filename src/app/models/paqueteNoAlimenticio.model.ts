/**
 * @interface PaqueteNoAlimenticioModel
 * @description Define la estructura de datos de un Paquete No Alimenticio en el sistema de envíos.
 * Se diferencia del paquete alimenticio en que incluye el campo `fragil`,
 * que indica si el contenido requiere manejo especial para evitar daños durante el transporte.
 */
export interface PaqueteNoAlimenticioModel {

  /** Identificador único del paquete generado por el backend. */
  id: number;

  /** Descripción del contenido no alimenticio del paquete. */
  descripcion: string;

  /** Peso del paquete en la unidad definida por el backend. */
  peso: number;

  /** Ciudad o dirección de origen del envío. */
  origen: string;

  /** Ciudad o dirección de destino del envío. */
  destino: string;

  /** Fecha programada de envío en formato string. */
  fechaEnvio: string;

  /** Indica si el paquete es frágil y requiere manipulación cuidadosa durante el transporte. */
  fragil: boolean;

}
