import { Component, Input, OnInit } from '@angular/core';
import { Internacion } from 'src/app/models/internacion/internacion';
import { InternacionesService } from 'src/app/services/internaciones/internaciones.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-de-internaciones',
  templateUrl: './listado-de-internaciones.component.html',
  styleUrls: ['./listado-de-internaciones.component.css'],
})
export class ListadoDeInternacionesComponent implements OnInit {
  @Input() internaciones: Internacion[];

  constructor(
    private mascotasService: MascotasService,
    private internacionesService: InternacionesService,
    private personaService: PersonasService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  //  OBTENER DATOS
  getAllDatos() {
    this.internacionesService.getAllData().subscribe(
      (dataInternacion: any) => {
        const internaciones = dataInternacion.resultado;

        for (const internacion of internaciones) {
          const idMascota = internacion.idMascota;
          this.mascotasService.getDataById(idMascota).subscribe(
            (dataMascota: any) => {
              const mascota = dataMascota.resultado;
              internacion.mascota = mascota;

              // Obtener el dueño de la mascota
              const idPersona = mascota.idPersona;
              this.personaService.getDataById(idPersona).subscribe(
                (dataPersona: any) => {
                  const dueño = dataPersona.resultado;
                  mascota.persona = dueño.nombreCompleto;
                },
                (errorPersona) => {
                  console.error('Error al obtener la persona:', errorPersona);
                }
              );
            },
            (errorMascota) => {
              console.error('Error al obtener la mascota:', errorMascota);
            }
          );
        }

        this.internaciones = internaciones;
        console.log(this.internaciones);
      },
      (errorInternacion) => {
        console.error('Error al obtener las internaciones:', errorInternacion);
      }
    );
  }

  // RECARGAR PAGINA AL IR EDITAR PARA QUE NO SE BUGUEE LOS DROPDOWN
  recargar() {
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.internaciones?.length;
  }
}
