import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sexo } from 'src/app/models/sexo/sexo';

@Injectable({
  providedIn: 'root',
})
export class SexosService {
  private API_URL = 'https://veterinariacorralito.somee.com/Sexos';

  constructor(private http: HttpClient) {}

  // mostra datos
  getAllData(): Observable<Sexo[]> {
    return this.http.get<Sexo[]>(this.API_URL);
  }
}
