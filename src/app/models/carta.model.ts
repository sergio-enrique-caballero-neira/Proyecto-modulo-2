/**
 * @interface CartaModel
 * @description Define la estructura de datos de una Carta en el sistema de envíos.
 * La carta es el tipo de envío más liviano. Se distingue de los paquetes
 * por tener un campo `tamano` en lugar de indicadores de condición especial
 * (refrigeración o fragilidad).
 */
export interface CartaModel {

  /** Identificador único de la carta generado por el backend. */
  id: number;

  /** Descripción del contenido de la carta. */
  descripcion: string;

  /** Peso de la carta en la unidad definida por el backend. */
  peso: number;

  /** Ciudad o dirección de origen del envío. */
  origen: string;

  /** Ciudad o dirección de destino del envío. */
  destino: string;

  /** Fecha programada de envío en formato string. */
  fechaEnvio: string;

  /** Tamaño de la carta. */
  tamano: string;

}
