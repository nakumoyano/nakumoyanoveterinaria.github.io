import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private API_URL = 'https://veterinariacorralito.somee.com/Personas';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idPersona: number,
    nombreCompleto: string,
    celular: string,
    domicilio: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idPersona', idPersona.toString());
    formData.append('nombreCompleto', nombreCompleto);
    formData.append('celular', celular);
    formData.append('domicilio', domicilio);

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(
      this.API_URL + '/' + persona.idPersona,
      persona
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(persona: Persona): Observable<Persona[]> {
    return this.http.delete<Persona[]>(this.API_URL + '/' + persona.idPersona);
  }
}
