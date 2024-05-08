import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from 'src/app/models/marca/marca';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  private API_URL = 'https://veterinariacorralito.somee.com/Empresas';
  private API_URL_MARCA_X_CATEGORIA =
    'https://veterinariacorralito.somee.com/EmpresasPorCategoria';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idEmpresa: number,
    empresa: string,
    idCategoria: number
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idEmpresa', idEmpresa.toString());
    formData.append('empresa', empresa);
    formData.append('idCategoria', idCategoria.toString());

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(this.API_URL + '/' + marca.idEmpresa, marca);
  }

  // GET BY ID
  getDataById(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.API_URL + '/' + id);
  }

  // GET MARCA POR CATEGORIA
  getDataMarcaByIdCategoria(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.API_URL_MARCA_X_CATEGORIA + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(marca: Marca): Observable<Marca[]> {
    return this.http.delete<Marca[]>(this.API_URL + '/' + marca.idEmpresa);
  }
}
