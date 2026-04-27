/**
 * @interface ModeloTempModel
 * @description Define la estructura del modelo de sesión temporal utilizado
 * por el sistema para mantener el contexto del usuario autenticado entre componentes.
 *
 * Este modelo es almacenado en `ModelosTempService` tras un login exitoso
 * y consumido por los dashboards (AdminDashboard, UsuariosDashboard) para
 * identificar al usuario activo y cargar sus datos desde el backend.
 *
 */
export interface ModeloTempModel {

  /** Identificador único del usuario autenticado en el backend. */
  id: number;

  /**
   * Tipo de entidad del usuario autenticado.
   * Determina qué servicio y qué dashboard se utilizan para cargar sus datos.
   */
  tipo: string;

}
