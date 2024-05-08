import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raza } from 'src/app/models/raza/raza';

@Injectable({
  providedIn: 'root',
})
export class RazasService {
  private API_URL = 'https://veterinariacorralito.somee.com/Razas';
  private API_URL_RAZAS_X_ESPECIES =
    'https://veterinariacorralito.somee.com/RazasPorEspecie';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Raza[]> {
    return this.http.get<Raza[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(idRaza: number, raza: string, idEspecie: number): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idRaza', idRaza.toString());
    formData.append('raza', raza);
    formData.append('idEspecie', idEspecie.toString());

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(raza: Raza): Observable<Raza> {
    return this.http.put<Raza>(this.API_URL + '/' + raza.idRaza, raza);
  }

  // GET BY ID
  getDataById(id: number): Observable<Raza> {
    return this.http.get<Raza>(this.API_URL + '/' + id);
  }

  // GET BY ID
  getDataRazaByIdEspecie(id: number): Observable<Raza> {
    return this.http.get<Raza>(this.API_URL_RAZAS_X_ESPECIES + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(raza: Raza): Observable<Raza[]> {
    return this.http.delete<Raza[]>(this.API_URL + '/' + raza.idRaza);
  }
}
