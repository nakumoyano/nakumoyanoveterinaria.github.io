import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Recordatorio } from 'src/app/models/recordatorio/recordatorio';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { RecordatoriosService } from 'src/app/services/recordatorios/recordatorios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-recordatorio-general',
  templateUrl: './listado-recordatorio-general.component.html',
  styleUrls: ['./listado-recordatorio-general.component.css'],
})
export class ListadoRecordatorioGeneralComponent implements OnInit {
  @Input() recordatorios: Recordatorio[];

  constructor(
    private recordatoriosService: RecordatoriosService,
    private mascotasService: MascotasService,
    private personasService: PersonasService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  getAllDatos() {
    this.recordatoriosService.getAllData().subscribe(
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
              this.personasService.getDataById(idPersona).subscribe(
                (dataPersona: any) => {
                  const dueño = dataPersona.resultado;
                  mascota.persona = dueño.nombreCompleto;
                  mascota.celularPersona = dueño.celular;
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

        this.recordatorios = internaciones;
        console.log(this.recordatorios);
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

  // FUNCION PARA ELIMINAR
  eliminar(recordatorio: any) {
    this.recordatoriosService.deleteData(recordatorio).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success(
            '¡El recordatorio se ha eliminado correctamente!'
          );
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        // Manejar el error al eliminar el producto
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar el recordatorio.'
        );
      },
    });
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.recordatorios?.length;
  }
}
