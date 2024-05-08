import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/app/models/proveedor/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  private API_URL = 'https://veterinariacorralito.somee.com/Proveedores';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idProveedor: number,
    nombreCompleto: string,
    nombreEmpresa: string,
    telefono: string,
    direccion: string,
    cuit: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idProveedor', idProveedor.toString());
    formData.append('nombreCompleto', nombreCompleto);
    formData.append('nombreEmpresa', nombreEmpresa);
    formData.append('telefono', telefono);
    formData.append('direccion', direccion);
    formData.append('cuit', cuit);

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(
      this.API_URL + '/' + proveedor.idProveedor,
      proveedor
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(proveedor: Proveedor): Observable<Proveedor[]> {
    return this.http.delete<Proveedor[]>(
      this.API_URL + '/' + proveedor.idProveedor
    );
  }
}
