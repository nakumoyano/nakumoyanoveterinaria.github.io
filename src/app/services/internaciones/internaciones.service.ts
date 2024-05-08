import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Internacion } from 'src/app/models/internacion/internacion';

@Injectable({
  providedIn: 'root',
})
export class InternacionesService {
  private API_URL = 'https://veterinariacorralito.somee.com/Internaciones';
  private API_URL_POR_MASCOTA =
    'https://veterinariacorralito.somee.com/InternacionesPorMascota';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Internacion[]> {
    return this.http.get<Internacion[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idInternacion: number,
    fechaIngreso: string,
    fechaEgreso: string,
    costoPorDia: number,
    costoTotal: number,
    saldoPagado: number,
    pagado: boolean,
    descripcion: string,
    idMascota: number,
    archivos?: File
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idInternacion', idInternacion.toString());
    formData.append('fechaIngreso', fechaIngreso);
    formData.append('fechaEgreso', fechaEgreso);
    formData.append('costoPorDia', costoPorDia.toString());
    formData.append('costoTotal', costoTotal.toString());
    formData.append('saldoPagado', saldoPagado.toString());
    formData.append('pagado', pagado.toString());
    formData.append('descripcion', descripcion);
    formData.append('idMascota', idMascota.toString());

    if (archivos) {
      formData.append('archivos', archivos, archivos.name);
    }

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(internacion: Internacion): Observable<Internacion> {
    return this.http.put<Internacion>(
      this.API_URL + '/' + internacion.idInternacion,
      internacion
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Internacion> {
    return this.http.get<Internacion>(this.API_URL + '/' + id);
  }
  // GET BY ID
  getDataInternacionByIdMascota(id: number): Observable<Internacion> {
    return this.http.get<Internacion>(this.API_URL_POR_MASCOTA + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(internacion: Internacion): Observable<Internacion[]> {
    return this.http.delete<Internacion[]>(
      this.API_URL + '/' + internacion.idInternacion
    );
  }
}
