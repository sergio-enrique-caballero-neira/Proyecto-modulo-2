import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaqueteNoAlimenticioModel} from '../models/paqueteNoAlimenticio.model';

@Injectable({
  providedIn: 'root',
})
export class PaquetenoalimenticioService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getPaquetesNoAlimenticios() {
    return this.cliente.get<PaqueteNoAlimenticioModel[]>(this.urlbase + '/paquetenoalimenticio/mostrartodo', {observe: 'response'});
  }

  postPaqueteNoAlimenticio(descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, fragil: boolean) {
    const url = this.urlbase + '/paquetenoalimenticio/crear?' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'fragil=' + fragil;

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putPaqueteNoAlimenticio(id: number, descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, fragil: boolean) {
    const url = this.urlbase + '/paquetenoalimenticio/actualizar?' +
      'id=' + id + '&' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'fragil=' + fragil;

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deletePaqueteNoAlimenticio(id: number) {
    return this.cliente.delete(this.urlbase + '/paquetenoalimenticio/eliminar?id=' + id, {responseType: 'text'});
  }

}
