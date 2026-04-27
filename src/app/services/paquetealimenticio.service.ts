import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaqueteAlimenticioModel} from '../models/paqueteAlimenticio.model';

/**
 * @service PaquetealimenticioService
 * @description Servicio para gestionar las operaciones CRUD del recurso Paquete Alimenticio
 * contra el backend REST. Un paquete alimenticio es un tipo de envío que contiene
 * productos perecederos o comestibles; su atributo distintivo es `refrigerado`,
 * que indica si requiere cadena de frío durante el transporte.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class PaquetealimenticioService {

  /** Cliente HTTP de Angular para realizar las peticiones al backend. */
  private cliente = inject(HttpClient);

  /** URL base del servidor backend. */
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de paquetes alimenticios registrados en el sistema.
   * @returns Observable con la respuesta HTTP completa que contiene un arreglo de `PaqueteAlimenticioModel`.
   */
  getPaquetesAlimenticios() {
    return this.cliente.get<PaqueteAlimenticioModel[]>(this.urlbase + '/paquetealimenticio/mostrartodo', {observe: 'response'});
  }

  /**
   * Crea un nuevo paquete alimenticio en el sistema.
   *
   * @param descripcion - Descripción del contenido alimenticio del paquete.
   * @param peso - Peso del paquete en gramos o kilogramos.
   * @param origen - Ciudad o dirección de origen del envío.
   * @param destino - Ciudad o dirección de destino del envío.
   * @param fechaEnvio - Fecha programada de envío en formato ISO (YYYY-MM-DD).
   * @param refrigerado - Indica si el paquete requiere refrigeración durante el transporte.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Actualiza los datos de un paquete alimenticio existente identificado por su ID.
   *
   * @param id - ID interno del paquete alimenticio a actualizar.
   * @param descripcion - Descripción del contenido alimenticio del paquete.
   * @param peso - Peso del paquete.
   * @param origen - Ciudad o dirección de origen del envío.
   * @param destino - Ciudad o dirección de destino del envío.
   * @param fechaEnvio - Fecha programada de envío en formato ISO (YYYY-MM-DD).
   * @param refrigerado - Indica si el paquete requiere refrigeración durante el transporte.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
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

  /**
   * Elimina un paquete alimenticio del sistema según su ID.
   *
   * @param id - ID interno del paquete alimenticio a eliminar.
   * @returns Observable con la respuesta del servidor en formato texto.
   */
  deletePaqueteAlimenticio(id: number) {
    return this.cliente.delete(this.urlbase + '/paquetealimenticio/eliminar?id=' + id, {responseType: 'text'});
  }

}
