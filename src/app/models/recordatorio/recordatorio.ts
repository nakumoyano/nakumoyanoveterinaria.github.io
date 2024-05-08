import { Mascota } from '../mascota/mascota';
import { Producto } from '../producto/producto';

export class Recordatorio {
  idRecordatorio: number;
  fecha: string;
  precio: string;
  telefono: string;
  motivo: string;
  mensajePredeterminado: string;
  registrado: boolean;
  nombreMascota: string;
  nombreCompletoPersona: string;
  idMascota: number;
  mascota?: Mascota;
  idProducto?: number;
  producto?: Producto;
}
