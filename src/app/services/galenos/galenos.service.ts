import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Galeno } from 'src/app/models/galeno/galeno';

@Injectable({
  providedIn: 'root',
})
export class GalenosService {
  private API_URL = 'https://veterinariacorralito.somee.com/Galeno';

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
}
