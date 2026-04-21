import { Injectable } from '@angular/core';
import { ModeloTempModel} from '../models/modeloTemp.model';

@Injectable({
  providedIn: 'root',
})
export class ModelosTempService {
  private _modelo: ModeloTempModel = { id: 0, tipo: "" };

  getModelo(): ModeloTempModel {
    return this._modelo;
  }

  setModelo(value: ModeloTempModel) {
    this._modelo = value;
  }

}
