import { Injectable } from '@angular/core';
import { ModeloTempModel} from '../models/modeloTemp.model';

/**
 * @service ModelosTempService
 * @description Servicio de estado temporal en memoria para compartir el modelo
 * activo entre componentes sin necesidad de persistencia en backend.
 * Almacena un único objeto `ModeloTempModel` que contiene el ID y el tipo
 * del registro seleccionado actualmente en la vista.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class ModelosTempService {

  /** Modelo temporal activo. Se inicializa con valores neutros. */
  private _modelo: ModeloTempModel = { id: 0, tipo: "" };

  /**
   * Retorna el modelo temporal actualmente almacenado.
   * @returns El objeto `ModeloTempModel` con el ID y tipo activos.
   */
  getModelo(): ModeloTempModel {
    return this._modelo;
  }

  /**
   * Establece el modelo temporal con un nuevo valor.
   *
   * @param value - Objeto `ModeloTempModel` con el ID y tipo del registro a compartir.
   */
  setModelo(value: ModeloTempModel) {
    this._modelo = value;
  }

}
