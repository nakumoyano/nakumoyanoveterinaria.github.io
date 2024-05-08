import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/models/mascota/mascota';

@Injectable({
  providedIn: 'root',
})
export class MascotasService {
  private API_URL = 'https://veterinariacorralito.somee.com/Mascotas';
  private API_URL_MASCOTA_BY_PERSONA_ID =
    'https://veterinariacorralito.somee.com/MascotasDePersonas';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idMascota: number,
    nombre: string,
    fechaNacimiento: string,
    manto: string,
    peso: number,
    castrado: string,
    antecedentes: string,
    idEspecie: number,
    idRaza: number,
    idSexo: number,
    idPersona: number
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idMascota', idMascota.toString());
    formData.append('nombre', nombre);
    formData.append('fechaNacimiento', fechaNacimiento);
    formData.append('manto', manto);
    formData.append('peso', peso.toString());
    formData.append('castrado', castrado);
    formData.append('antecedentes', antecedentes);
    formData.append('idEspecie', idEspecie.toString());
    formData.append('idRaza', idRaza.toString());
    formData.append('idSexo', idSexo.toString());
    formData.append('idPersona', idPersona.toString());

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(
      this.API_URL + '/' + mascota.idMascota,
      mascota
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(this.API_URL + '/' + id);
  }

  // GET MACOTA BY PERSONA ID
  getMascotaByIdPersona(id: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(
      this.API_URL_MASCOTA_BY_PERSONA_ID + '/' + id
    );
  }

  // ELIMINAR DATOS
  deleteData(mascota: Mascota): Observable<Mascota[]> {
    return this.http.delete<Mascota[]>(this.API_URL + '/' + mascota.idMascota);
  }
}
