import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompraARealizar } from 'src/app/models/compra-a-realizar/compra-a-realizar';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private API_URL = 'https://veterinariacorralito.somee.com/ComprasARealizar';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<CompraARealizar[]> {
    return this.http.get<CompraARealizar[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idCompra: number,
    productoRegistrado: boolean,
    idProducto: number,
    idPrioridad: number,
    cantidad: number,
    fecha: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('idCompra', idCompra.toString());
    formData.append('productoRegistrado', productoRegistrado.toString());
    formData.append('idProducto', idProducto.toString());
    formData.append('idPrioridad', idPrioridad.toString());
    formData.append('cantidad', cantidad.toString());
    formData.append('fecha', fecha);

    return this.http.post<any>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(compraRealizar: CompraARealizar): Observable<CompraARealizar> {
    return this.http.put<CompraARealizar>(
      this.API_URL + '/' + compraRealizar.idCompra,
      compraRealizar
    );
  }

  // GET BY ID
  getDataById(id: number): Observable<CompraARealizar> {
    return this.http.get<CompraARealizar>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(compraRealizar: CompraARealizar): Observable<CompraARealizar[]> {
    return this.http.delete<CompraARealizar[]>(
      this.API_URL + '/' + compraRealizar.idCompra
    );
  }
}
