import { Categoria } from '../categoria/categoria';

export class Marca {
  idEmpresa: number;
  empresa: string;
  idCategoria: number;
  categoria?: Categoria;
}
