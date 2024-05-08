import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Recordatorio } from 'src/app/models/recordatorio/recordatorio';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { RecordatoriosService } from 'src/app/services/recordatorios/recordatorios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-recordatorios-hoy',
  templateUrl: './listado-recordatorios-hoy.component.html',
  styleUrls: ['./listado-recordatorios-hoy.component.css'],
})
export class ListadoRecordatoriosHoyComponent implements OnInit {
  @Input() recordatorios: Recordatorio[];

  constructor(
    private recordatoriosService: RecordatoriosService,
    private mascotasService: MascotasService,
    private personasService: PersonasService,
    private productoService: ProductosService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // OBTENER DATOS DIA DE HOY
  getAllDatos() {
    this.productoService.getAllData().subscribe(
      (dataProductos: any) => {
        const productos = dataProductos.resultado;

        this.mascotasService.getAllData().subscribe(
          (dataMascotas: any) => {
            const mascotas = dataMascotas.resultado;

            this.recordatoriosService.getDataToday().subscribe(
              (dataRecordatorios: any) => {
                const recordatorios = dataRecordatorios.resultado;

                for (const recordatorio of recordatorios) {
                  const productosPerteneciente = productos.find(
                    (producto: any) =>
                      producto.idProducto === recordatorio.idProducto
                  );
                  const mascotasPerteneciente = mascotas.find(
                    (mascota: any) =>
                      mascota.idMascota === recordatorio.idMascota
                  );

                  if (productosPerteneciente) {
                    recordatorio.producto = productosPerteneciente;
                  }
                  if (mascotasPerteneciente) {
                    recordatorio.mascota = mascotasPerteneciente;
                  }
                }

                this.recordatorios = recordatorios;
                console.log(this.recordatorios);
              },
              (errorSubCategorias) => {
                console.error(
                  'Error al obtener los recordatorios:',
                  errorSubCategorias
                );
              }
            );
          },
          (errorMascotas) => {
            console.error('Error al obtener las mascotas:', errorMascotas);
          }
        );
      },
      (errorPersonas) => {
        console.error('Error al obtener las prdocuto:', errorPersonas);
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
