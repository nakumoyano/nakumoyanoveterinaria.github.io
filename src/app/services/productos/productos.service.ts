import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private API_URL = 'https://veterinariacorralito.somee.com/Productos';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idProducto: number,
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    stockMinimo: number,
    codigo: string,
    idEmpresa: number,
    idCategoria: number
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idProducto', idProducto.toString());
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio.toString());
    formData.append('stock', stock.toString());
    formData.append('stockMinimo', stockMinimo.toString());
    formData.append('codigo', codigo);
    formData.append('idEmpresa', idEmpresa.toString());
    formData.append('idCategoria', idCategoria.toString());

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      this.API_URL + '/' + producto.idProducto,
      producto
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(producto: Producto): Observable<Producto[]> {
    return this.http.delete<Producto[]>(
      this.API_URL + '/' + producto.idProducto
    );
  }
}
