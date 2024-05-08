import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModoPago } from 'src/app/models/modo-pago/modo-pago';

@Injectable({
  providedIn: 'root',
})
export class ModoPagosService {
  private API_URL = 'https://veterinariacorralito.somee.com/ModosPago';

  constructor(private http: HttpClient) {}

  // mostra datos
  getAllModosPagos(): Observable<ModoPago[]> {
    return this.http.get<ModoPago[]>(this.API_URL);
  }
}
