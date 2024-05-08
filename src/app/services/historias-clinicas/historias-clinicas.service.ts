import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoriaClinica } from 'src/app/models/historia-clinica/historia-clinica';

@Injectable({
  providedIn: 'root',
})
export class HistoriasClinicasService {
  private API_URL = 'https://veterinariacorralito.somee.com/HistoriasClinicas';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<HistoriaClinica[]> {
    return this.http.get<HistoriaClinica[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idHistoriaClinica: number,
    fechaHora: string,
    motivo: string,
    detalles: string,
    idMascota: number,
    archivos?: File
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idHistoriaClinica', idHistoriaClinica.toString());
    formData.append('fechaHora', fechaHora);
    formData.append('motivo', motivo);
    formData.append('detalles', detalles);
    formData.append('idMascota', idMascota.toString());

    if (archivos) {
      formData.append('archivos', archivos, archivos.name);
    }

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(hClinica: HistoriaClinica): Observable<HistoriaClinica> {
    return this.http.put<HistoriaClinica>(
      this.API_URL + '/' + hClinica.idHistoriaClinica,
      hClinica
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<HistoriaClinica> {
    return this.http.get<HistoriaClinica>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(hClinica: HistoriaClinica): Observable<HistoriaClinica[]> {
    return this.http.delete<HistoriaClinica[]>(
      this.API_URL + '/' + hClinica.idHistoriaClinica
    );
  }
}
