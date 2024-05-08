import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Honorario } from 'src/app/models/honorario/honorario';

@Injectable({
  providedIn: 'root',
})
export class HonorariosService {
  private API_URL = 'https://veterinariacorralito.somee.com/Honorarios';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Honorario[]> {
    return this.http.get<Honorario[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idHonorario: number,
    nombreHonorario: string,
    galenos: number
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idHonorario', idHonorario.toString());
    formData.append('nombreHonorario', nombreHonorario);
    formData.append('galenos', galenos.toString());

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(honorario: Honorario): Observable<Honorario> {
    return this.http.put<Honorario>(
      this.API_URL + '/' + honorario.idHonorario,
      honorario
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Honorario> {
    return this.http.get<Honorario>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(honorario: Honorario): Observable<Honorario[]> {
    return this.http.delete<Honorario[]>(
      this.API_URL + '/' + honorario.idHonorario
    );
  }
}
