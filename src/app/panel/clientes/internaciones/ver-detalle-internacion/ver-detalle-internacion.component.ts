import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Internacion } from 'src/app/models/internacion/internacion';
import { InternacionesService } from 'src/app/services/internaciones/internaciones.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-detalle-internacion',
  templateUrl: './ver-detalle-internacion.component.html',
  styleUrls: ['./ver-detalle-internacion.component.css'],
})
export class VerDetalleInternacionComponent implements OnInit {
  @Input() internaciones: Internacion[];

  constructor(
    private mascotasService: MascotasService,
    private internacionesService: InternacionesService,
    private activatedRoute: ActivatedRoute,
    private personasService: PersonasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.getAllDatos(id);
      }
    });
  }

  // FUNCION PARA TRAER DATOS
  getAllDatos(id: number) {
    let mascotas: any[];
    let internaciones: any[];

    this.mascotasService.getAllData().subscribe(
      (dataMascotas: any) => {
        mascotas = dataMascotas.resultado;

        this.internacionesService.getDataById(id).subscribe(
          (dataInternacion: any) => {
            const internacion = dataInternacion.resultado;

            const mascotaPerteneciente = mascotas.find(
              (mascota: any) => mascota.idMascota === internacion.idMascota
            );

            if (mascotaPerteneciente) {
              internacion.mascota = mascotaPerteneciente;

              // Obtener la persona asociada a la mascota
              this.personasService
                .getDataById(internacion.mascota.idPersona)
                .subscribe(
                  (dataPersona: any) => {
                    const persona = dataPersona.resultado;
                    internacion.mascota.persona = persona;

                    // Ahora puedes acceder a la persona asociada a la mascota
                    console.log('Persona asociada a la mascota:', persona);
                  },
                  (errorPersona) => {
                    console.error('Error al obtener la persona:', errorPersona);
                  }
                );
            }

            this.internaciones = [internacion];
            console.log(this.internaciones);
          },
          (errorInternacion) => {
            console.error(
              'Error al obtener las internaciones:',
              errorInternacion
            );
          }
        );
      },
      (errorMascotas) => {
        console.error('Error al obtener las mascotas:', errorMascotas);
      }
    );
  }
}
