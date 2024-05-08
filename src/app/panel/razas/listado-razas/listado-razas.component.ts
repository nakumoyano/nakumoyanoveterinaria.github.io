import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Raza } from 'src/app/models/raza/raza';
import { EspeciesService } from 'src/app/services/especies/especies.service';
import { RazasService } from 'src/app/services/razas/razas.service';

@Component({
  selector: 'app-listado-razas',
  templateUrl: './listado-razas.component.html',
  styleUrls: ['./listado-razas.component.css'],
})
export class ListadoRazasComponent implements OnInit {
  @Input() razas: Raza[];

  constructor(
    private razaService: RazasService,
    private especiesService: EspeciesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // FUNCION PARA OBTENER TODOS LOS DATOS
  getAllDatos() {
    this.especiesService.getAllEspecies().subscribe(
      (dataEspecies: any) => {
        const espcies = dataEspecies.resultado;

        this.razaService.getAllData().subscribe(
          (dataRazas: any) => {
            const razas = dataRazas.resultado;

            for (const raza of razas) {
              const especiesPerteneciente = espcies.find(
                (especie: any) => especie.idEspecie === raza.idEspecie
              );

              if (especiesPerteneciente) {
                raza.especie = especiesPerteneciente;
              }
            }

            this.razas = razas;
            console.log(this.razas);
          },
          (errorRazas) => {
            console.error('Error al obtener las razas:', errorRazas);
          }
        );
      },
      (errorEspecies) => {
        console.error('Error al obtener los especies:', errorEspecies);
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
  eliminar(raza: any) {
    this.razaService.deleteData(raza).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡La raza se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error('Ha ocurrido un error al intentar eliminar la raza.');
      },
    });
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.razas?.length;
  }
}
