import { Component, Input, OnInit } from '@angular/core';
import { Galeno } from 'src/app/models/galeno/galeno';
import { Honorario } from 'src/app/models/honorario/honorario';
import { GalenosService } from 'src/app/services/galenos/galenos.service';
import { HonorariosService } from 'src/app/services/honorarios/honorarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-honorarios',
  templateUrl: './listado-honorarios.component.html',
  styleUrls: ['./listado-honorarios.component.css'],
})
export class ListadoHonorariosComponent implements OnInit {
  honorarios: any[] = []; // Suponiendo que honorarios es una lista de objetos que contienen información sobre los honorarios
  galeno: Galeno; // Declara this.galeno como una propiedad

  constructor(
    private galenosService: GalenosService,
    private honorariosService: HonorariosService
  ) {}

  ngOnInit(): void {
    this.getHonorariosData();
    this.getGalenoData();
  }

  getHonorariosData() {
    this.honorariosService.getAllData().subscribe(
      (data: any) => {
        this.honorarios = data.resultado;
        console.log(this.honorarios);
      },
      (error) => {
        console.error('Error al obtener los honorarios', error);
      }
    );
  }

  getGalenoData() {
    const idDelGaleno = 1;
    this.galenosService.getDataById(idDelGaleno).subscribe(
      (response: any) => {
        this.galeno = response.resultado;
        console.log(this.galeno);
      },
      (error) => {
        console.error('Error al obtener el Galeno', error);
      }
    );
  }

  calcularPrecioPesoGaleno(honorario: any): number {
    return this.galeno.precioGaleno * honorario.galenos;
  }

  // RECARGAR PAGINA AL IR EDITAR PARA QUE NO SE BUGUEE LOS DROPDOWN
  recargar() {
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.honorarios?.length;
  }
}
