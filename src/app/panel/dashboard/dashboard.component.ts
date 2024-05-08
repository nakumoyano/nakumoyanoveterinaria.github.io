import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Mascota } from 'src/app/models/mascota/mascota';
import { Producto } from 'src/app/models/producto/producto';
import { Recordatorio } from 'src/app/models/recordatorio/recordatorio';
import { MarcasService } from 'src/app/services/marcas/marcas.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { RecordatoriosService } from 'src/app/services/recordatorios/recordatorios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @Input() productos: Producto[];
  @Input() mascotas: Mascota[];
  @Input() recordatorios: Recordatorio[] = [];

  constructor(
    private marcasService: MarcasService,
    private productoService: ProductosService,
    private proveedoresService: ProveedoresService,
    private mascotasService: MascotasService,
    private recordatoriosService: RecordatoriosService,
    private personasService: PersonasService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getAllDatos();
    this.getAllRecordatorios();
    this.getAllMascotas();
  }

  // OBTENER DATOS DE PRODUCTOS SIN STOCK
  getAllDatos() {
    forkJoin([
      this.marcasService.getAllData(),
      this.proveedoresService.getAllData(),
      this.productoService.getAllData(),
    ]).subscribe(
      ([dataMarcas, dataProveedores, dataProductos]: any) => {
        const marcas = dataMarcas.resultado;
        const proveedores = dataProveedores.resultado;
        const productos = dataProductos.resultado;

        productos.forEach((producto: any) => {
          producto.empresa = marcas.find(
            (marca: any) => marca.idEmpresa === producto.idEmpresa
          );
          producto.proveedor = proveedores.find(
            (proveedor: any) => proveedor.idProveedor === producto.idProveedor
          );
        });

        this.productos = productos.filter(
          (producto: any) => producto.stock <= 10
        );
        console.log(this.productos);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  // VER SI HAY PRODUCTOS PARA MOSTRAR MENSAJE
  tieneProductosAReponer(): boolean {
    return this.productos?.some((producto) => producto.stock <= 11);
  }
  tieneRecordatorios(): boolean {
    return this.productos?.some((producto: any) => producto > 2);
  }

  // FUNCION PARA OBTENER DATOS DE MASCOTAS
  getAllMascotas() {
    this.mascotasService.getAllData().subscribe(
      (data: any) => {
        const mascotas = data.resultado;

        this.mascotas = mascotas;
        console.log(this.mascotas);
      },
      (error) => {
        console.error('Error al obtener los mascotas', error);
      }
    );
  }

  // OBTENER DATOS RECORDATORIOS DEL DIA DE HOY
  // getAllRecordatorios() {
  //   this.productoService.getAllData().subscribe(
  //     (dataProductos: any) => {
  //       const productos = dataProductos.resultado;

  //       this.mascotasService.getAllData().subscribe(
  //         (dataMascotas: any) => {
  //           const mascotas = dataMascotas.resultado;

  //           this.recordatoriosService.getDataToday().subscribe(
  //             (dataRecordatorios: any) => {
  //               const recordatorios = dataRecordatorios.resultado;

  //               for (const recordatorio of recordatorios) {
  //                 const productosPerteneciente = productos.find(
  //                   (producto: any) =>
  //                     producto.idProducto === recordatorio.idProducto
  //                 );
  //                 const mascotasPerteneciente = mascotas.find(
  //                   (mascota: any) =>
  //                     mascota.idMascota === recordatorio.idMascota
  //                 );

  //                 if (productosPerteneciente) {
  //                   recordatorio.producto = productosPerteneciente;
  //                 }
  //                 if (mascotasPerteneciente) {
  //                   recordatorio.mascota = mascotasPerteneciente;
  //                 }
  //               }

  //               this.recordatorios = recordatorios;
  //               console.log(this.recordatorios);
  //             },
  //             (errorSubCategorias) => {
  //               console.error(
  //                 'Error al obtener los recordatorios:',
  //                 errorSubCategorias
  //               );
  //             }
  //           );
  //         },
  //         (errorMascotas) => {
  //           console.error('Error al obtener las mascotas:', errorMascotas);
  //         }
  //       );
  //     },
  //     (errorPersonas) => {
  //       console.error('Error al obtener las prdocuto:', errorPersonas);
  //     }
  //   );
  // }
  getAllRecordatorios() {
    this.recordatoriosService.getDataToday().subscribe(
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

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.mascotas?.length;
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS RECORDATORIOS
  obtenerTotalRecordatorios(): number {
    return this.recordatorios?.length;
  }
}
