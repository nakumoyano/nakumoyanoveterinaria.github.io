import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Producto } from 'src/app/models/producto/producto';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MarcasService } from 'src/app/services/marcas/marcas.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css'],
})
export class ListadoProductosComponent implements OnInit {
  @Input() productos: Producto[];

  constructor(
    private marcasService: MarcasService,
    private productoService: ProductosService,
    private categoriasService: CategoriasService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  getAllDatos() {
    forkJoin([
      this.marcasService.getAllData(),
      this.categoriasService.getAllData(),
      this.productoService.getAllData(),
    ]).subscribe(
      ([dataMarcas, dataCategorias, dataProductos]: any) => {
        const marcas = dataMarcas.resultado;
        const categorias = dataCategorias.resultado;
        const productos = dataProductos.resultado;

        productos.forEach((producto: any) => {
          const marcasPerteneciente = marcas.find(
            (marca: any) => marca.idEmpresa === producto.idEmpresa
          );
          const categoriasPerteneciente = categorias.find(
            (categoria: any) => categoria.idCategoria === producto.idCategoria
          );
          if (marcasPerteneciente) producto.empresa = marcasPerteneciente;
          if (categoriasPerteneciente)
            producto.categoria = categoriasPerteneciente;
        });

        this.productos = productos;
        console.log(this.productos);
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
  eliminar(producto: any) {
    this.productoService.deleteData(producto).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toast.success('¡El producto se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        // Manejar el error al eliminar el producto
        this.toast.error(
          'Ha ocurrido un error al intentar eliminar el producto.'
        );
      },
    });
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.productos?.length;
  }
}
