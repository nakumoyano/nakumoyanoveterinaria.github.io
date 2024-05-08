import { Categoria } from '../categoria/categoria';
import { Marca } from '../marca/marca';
import { Proveedor } from '../proveedor/proveedor';

export class Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  codigo: string;
  idEmpresa: number;
  empresa?: Marca;
  idCategoria: number;
  categoria?: Categoria;
}
