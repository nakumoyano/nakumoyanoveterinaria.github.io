import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recordatorio } from 'src/app/models/recordatorio/recordatorio';

@Injectable({
  providedIn: 'root',
})
export class RecordatoriosService {
  private API_URL = 'https://veterinariacorralito.somee.com/Recordatorios';
  private API_URL_TODAY =
    'https://veterinariacorralito.somee.com/RecordatoriosDelDia';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Recordatorio[]> {
    return this.http.get<Recordatorio[]>(this.API_URL);
  }

  // MOSTRAR DATOS DE HOY
  getDataToday(): Observable<Recordatorio[]> {
    return this.http.get<Recordatorio[]>(this.API_URL_TODAY);
  }

  // CARGAR DATOS
  addData(
    idRecordatorio: number,
    fecha: string,
    precio: number,
    telefono: string,
    motivo: string,
    mensajePredeterminado: string,
    registrado: boolean,
    nombreMascota: string,
    nombreCompletoPersona: string,
    idMascota: number,
    idProducto: number
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idRecordatorio', idRecordatorio.toString());
    formData.append('fecha', fecha);
    formData.append('precio', precio.toString());
    formData.append('telefono', telefono);
    formData.append('motivo', motivo);
    formData.append('mensajePredeterminado', mensajePredeterminado);
    formData.append('registrado', registrado.toString());
    formData.append('nombreMascota', nombreMascota);
    formData.append('nombreCompletoPersona', nombreCompletoPersona);

    // Verificar si idMascota no es null antes de agregarlo
    if (idMascota !== null) {
      formData.append('idMascota', idMascota.toString());
    }

    // Verificar si idProducto no es null antes de agregarlo
    if (idProducto !== null) {
      formData.append('idProducto', idProducto.toString());
    }

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(recordatorio: Recordatorio): Observable<Recordatorio> {
    return this.http.put<Recordatorio>(
      this.API_URL + '/' + recordatorio.idRecordatorio,
      recordatorio
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Recordatorio> {
    return this.http.get<Recordatorio>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(recordatorio: Recordatorio): Observable<Recordatorio[]> {
    return this.http.delete<Recordatorio[]>(
      this.API_URL + '/' + recordatorio.idRecordatorio
    );
  }
}
