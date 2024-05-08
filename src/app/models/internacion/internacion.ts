import { Mascota } from '../mascota/mascota';

export class Internacion {
  idInternacion: number;
  fechaIngreso: string;
  fechaEgreso: string;
  costoPorDia: number;
  costoTotal: number;
  saldoPagado: number;
  pagado: boolean;
  descripcion: string;
  archivos: string;
  idMascota: number;
  mascota?: Mascota;
}
