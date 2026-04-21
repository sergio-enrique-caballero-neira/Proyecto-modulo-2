import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaqueteAlimenticioModel} from '../models/paqueteAlimenticio.model';

@Injectable({
  providedIn: 'root',
})
export class PaquetealimenticioService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getPaquetesAlimenticios() {
    return this.cliente.get<PaqueteAlimenticioModel[]>(this.urlbase + '/paquetealimenticio/mostrartodo', {observe: 'response'});
  }

  postPaqueteAlimenticio(descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, refrigerado: boolean) {
    const url = this.urlbase + '/paquetealimenticio/crear?' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'refrigerado=' + refrigerado;

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putPaqueteAlimenticio(id: number, descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, refrigerado: boolean) {
    const url = this.urlbase + '/paquetealimenticio/actualizar?' +
      'id=' + id + '&' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'refrigerado=' + refrigerado;

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deletePaqueteAlimenticio(id: number) {
    return this.cliente.delete(this.urlbase + '/paquetealimenticio/eliminar?id=' + id, {responseType: 'text'});
  }

}
