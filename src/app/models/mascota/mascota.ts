import { Especie } from '../especie/especie';
import { Persona } from '../persona/persona';
import { Raza } from '../raza/raza';
import { Sexo } from '../sexo/sexo';

export class Mascota {
  idMascota: number;
  nombre: string;
  fechaNacimiento: any;
  manto: string;
  peso: number;
  castrado: boolean;
  antecedentes: string;
  idEspecie: number;
  especie?: Especie;
  idRaza: number;
  raza?: Raza;
  idSexo: number;
  sexo?: Sexo;
  idPersona: number;
  persona?: Persona;
  celularPersona?: Persona;
}
