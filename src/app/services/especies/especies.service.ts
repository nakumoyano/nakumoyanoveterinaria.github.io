import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especie } from 'src/app/models/especie/especie';

@Injectable({
  providedIn: 'root',
})
export class EspeciesService {
  private API_URL = 'https://veterinariacorralito.somee.com/Especies';

  constructor(private http: HttpClient) {}

  // mostra datos
  getAllEspecies(): Observable<Especie[]> {
    return this.http.get<Especie[]>(this.API_URL);
  }
}
