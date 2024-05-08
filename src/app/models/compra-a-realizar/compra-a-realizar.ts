import { Prioridad } from '../prioridad/prioridad';
import { Producto } from '../producto/producto';

export class CompraARealizar {
  idCompra: number;
  productoRegistrado: boolean;
  idProducto: number;
  producto?: Producto;
  idPrioridad: number;
  prioridad?: Prioridad;
  cantidad: number;
  fecha: string;
}
