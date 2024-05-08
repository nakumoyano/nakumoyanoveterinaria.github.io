import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prioridad } from 'src/app/models/prioridad/prioridad';

@Injectable({
  providedIn: 'root',
})
export class PrioridadesService {
  private API_URL = 'https://veterinariacorralito.somee.com/Prioridades';

  constructor(private http: HttpClient) {}

  // mostra datos
  getAllData(): Observable<Prioridad[]> {
    return this.http.get<Prioridad[]>(this.API_URL);
  }
}
