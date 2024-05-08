import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models/persona/persona';
import { PersonasService } from 'src/app/services/personas/personas.service';

@Component({
  selector: 'app-listado-personas',
  templateUrl: './listado-personas.component.html',
  styleUrls: ['./listado-personas.component.css'],
})
export class ListadoPersonasComponent implements OnInit {
  @Input() personas: Persona[];

  constructor(
    private personasService: PersonasService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // FUNCION PARA OBTENER TODOS LOS DATOS
  getAllDatos() {
    this.personasService.getAllData().subscribe(
      (data: any) => {
        const personas = data.resultado;

        this.personas = personas;
        console.log(this.personas);
      },
      (error) => {
        console.error('Error al obtener los personas', error);
      }
    );
  }

  // FUNCION PARA ELIMINAR
  eliminar(persona: any) {
    this.personasService.deleteData(persona).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡La persona se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar la persona.'
        );
      },
    });
  }

  // RECARGAR PAGINA AL IR EDITAR PARA QUE NO SE BUGUEE LOS DROPDOWN
  recargar() {
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.personas?.length;
  }
}
