import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { CompraARealizar } from 'src/app/models/compra-a-realizar/compra-a-realizar';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { PrioridadesService } from 'src/app/services/prioridades/prioridades.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-compras-por-hacer',
  templateUrl: './listado-compras-por-hacer.component.html',
  styleUrls: ['./listado-compras-por-hacer.component.css'],
})
export class ListadoComprasPorHacerComponent implements OnInit, AfterViewInit {
  @Input() comprasRealizar: CompraARealizar[];

  constructor(
    private productoService: ProductosService,
    private prioridadService: PrioridadesService,
    private comprasRealizarService: ComprasService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getAllDatos();
  }

  getAllDatos() {
    forkJoin([
      this.productoService.getAllData(),
      this.prioridadService.getAllData(),
      this.comprasRealizarService.getAllData(),
    ]).subscribe(
      ([dataProducto, dataPrioridades, dataCompras]: any) => {
        const productos = dataProducto.resultado;
        const prioridades = dataPrioridades.resultado;
        const comprasRealizar = dataCompras.resultado;

        comprasRealizar.forEach((compraRealizar: any) => {
          compraRealizar.producto = productos.find(
            (producto: any) => producto.idProducto === compraRealizar.idProducto
          );
          compraRealizar.prioridad = prioridades.find(
            (prioridad: any) =>
              prioridad.idPrioridad === compraRealizar.idPrioridad
          );
        });

        this.comprasRealizar = comprasRealizar;
        console.log(this.comprasRealizar);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
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
  eliminar(compra: any) {
    this.comprasRealizarService.deleteData(compra).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success(
            '¡La compra a realizar se ha eliminado correctamente!'
          );
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        // Manejar el error al eliminar el producto
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar la compra a realizar.'
        );
      },
    });
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.comprasRealizar?.length;
  }
}
