import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartaModel} from '../models/carta.model';

@Injectable({
  providedIn: 'root',
})
export class CartaService {

  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getCartas() {
    return this.cliente.get<CartaModel[]>(this.urlbase + '/carta/mostrartodo', {observe: 'response'});
  }

  postCarta(descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, tamano: string) {
    const url = this.urlbase + '/carta/crear?' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'tamano=' + encodeURIComponent(tamano);

    return this.cliente.post(url, null, {responseType: 'text'});
  }

  putCarta(id: number, descripcion: string, peso: number, origen: string, destino: string, fechaEnvio: string, tamano: string) {
    const url = this.urlbase + '/carta/actualizar?' +
      'id=' + id + '&' +
      'descripcion=' + encodeURIComponent(descripcion) + '&' +
      'peso=' + peso + '&' +
      'origen=' + encodeURIComponent(origen) + '&' +
      'destino=' + encodeURIComponent(destino) + '&' +
      'fechaEnvio=' + encodeURIComponent(fechaEnvio) + '&' +
      'tamano=' + encodeURIComponent(tamano);

    return this.cliente.put(url, null, {responseType: 'text'});
  }

  deleteCarta(id: number) {
    return this.cliente.delete(this.urlbase + '/carta/eliminar?id=' + id, {responseType: 'text'});
  }

}
