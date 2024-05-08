import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private API_URL = 'https://veterinariacorralito.somee.com/Categorias';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }

  // GET BY ID
  getDataById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API_URL}/${id}`);
  }
}
