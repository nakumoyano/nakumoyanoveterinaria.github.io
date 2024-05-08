import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Galeno } from 'src/app/models/galeno/galeno';
import { Honorario } from 'src/app/models/honorario/honorario';

@Injectable({
  providedIn: 'root',
})
export class GalenosHonorariosService {
  private API_URL = 'https://veterinariacorralito.somee.com/Galeno';
  private API_HONORARIOS = 'https://veterinariacorralito.somee.com/Honorarios';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Galeno[]> {
    return this.http.get<Galeno[]>(this.API_URL);
  }

  // GET BY ID
  getDataById(id: number): Observable<Galeno> {
    return this.http.get<Galeno>(`${this.API_URL}/${id}`);
  }

  // EDITAR DATOS
  updateData(galeno: Galeno): Observable<Galeno> {
    return this.http.put<Galeno>(this.API_URL + '/' + galeno.idGaleno, galeno);
  }

  // d****************************************** HONORARIOS *****************************
  // MOSTRAR DATOS
  getAllDataHonorario(): Observable<Honorario[]> {
    return this.http.get<Honorario[]>(this.API_HONORARIOS);
  }

  // CARGAR DATOS
  addDataHonorario(
    idHonorario: number,
    nombreHonorario: string,
    galenos: number
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idHonorario', idHonorario.toString());
    formData.append('nombreHonorario', nombreHonorario);
    formData.append('galenos', galenos.toString());

    return this.http.post<any>(this.API_HONORARIOS, formData);
  }

  // EDITAR DATOS
  updateDataHonorario(honorario: Honorario): Observable<Honorario> {
    return this.http.put<Honorario>(
      this.API_HONORARIOS + '/' + honorario.idHonorario,
      honorario
    );
  }

  // GET BY ID
  getDataByIdHonorario(id: number): Observable<Honorario> {
    return this.http.get<Honorario>(this.API_HONORARIOS + '/' + id);
  }

  // ELIMINAR DATOS
  deleteDataHonorario(honorario: Honorario): Observable<Honorario[]> {
    return this.http.delete<Honorario[]>(
      this.API_HONORARIOS + '/' + honorario.idHonorario
    );
  }
}
