import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Galeno } from 'src/app/models/galeno/galeno';
import { GalenosHonorariosService } from 'src/app/services/galenos/galenos-honorarios.service';

@Component({
  selector: 'app-listado-galeno',
  templateUrl: './listado-galeno.component.html',
  styleUrls: ['./listado-galeno.component.css'],
})
export class ListadoGalenoComponent implements OnInit {
  galeno: Galeno;

  constructor(
    private galenosHonorariosService: GalenosHonorariosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // FUNCION PARA OBTENER TODOS LOS DATOS
    const idDelGaleno = 1;
    this.galenosHonorariosService.getDataById(idDelGaleno).subscribe(
      (response: any) => {
        this.galeno = response.resultado;
        console.log(this.galeno);
      },
      (error) => {
        console.error('Error al obtener el Galeno', error);
      }
    );
  }
}
