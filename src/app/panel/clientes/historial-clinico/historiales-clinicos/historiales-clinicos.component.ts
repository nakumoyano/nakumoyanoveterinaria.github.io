import { Component, Input, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/models/historia-clinica/historia-clinica';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas/historias-clinicas.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';

@Component({
  selector: 'app-historiales-clinicos',
  templateUrl: './historiales-clinicos.component.html',
  styleUrls: ['./historiales-clinicos.component.css'],
})
export class HistorialesClinicosComponent implements OnInit {
  @Input() historiales: HistoriaClinica[];

  constructor(
    private mascotasService: MascotasService,
    private historialesService: HistoriasClinicasService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  getAllDatos() {
    this.mascotasService.getAllData().subscribe(
      (dataMascotas: any) => {
        const mascotas = dataMascotas.resultado;

        this.historialesService.getAllData().subscribe(
          (dataHistorial: any) => {
            const historiales = dataHistorial.resultado;

            for (const historial of historiales) {
              const mascotasPerteneciente = mascotas.find(
                (mascota: any) => mascota.idMascota === historial.idMascota
              );

              if (mascotasPerteneciente) {
                historial.mascota = mascotasPerteneciente;
              }
            }

            this.historiales = historiales;
            console.log(this.historiales);
          },
          (errorHistorial) => {
            console.error('Error al obtener los historiales:', errorHistorial);
          }
        );
      },
      (errorMascotas) => {
        console.error('Error al obtener las mascotas:', errorMascotas);
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
    return this.historiales?.length;
  }
}
