import { Mascota } from '../mascota/mascota';

export class HistoriaClinica {
  idHistoriaClinica: number;
  fechaHora: string;
  motivo: string;
  detalles: string;
  archivos: any;
  idMascota: number;
  mascota?: Mascota;
}
