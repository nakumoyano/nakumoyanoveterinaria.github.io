import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/marca/marca';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MarcasService } from 'src/app/services/marcas/marcas.service';

@Component({
  selector: 'app-listado-marcas',
  templateUrl: './listado-marcas.component.html',
  styleUrls: ['./listado-marcas.component.css'],
})
export class ListadoMarcasComponent implements OnInit {
  @Input() marcas: Marca[];

  constructor(
    private marcasService: MarcasService,
    private categoriasService: CategoriasService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // FUNCION PARA OBTENER TODOS LOS DATOS
  getAllDatos() {
    this.categoriasService.getAllData().subscribe(
      (dataCategorias: any) => {
        const categorias = dataCategorias.resultado;

        this.marcasService.getAllData().subscribe(
          (dataMarcas: any) => {
            const marcas = dataMarcas.resultado;

            for (const marca of marcas) {
              const categoriasPerteneciente = categorias.find(
                (categoria: any) => categoria.idCategoria === marca.idCategoria
              );

              if (categoriasPerteneciente) {
                marca.categoria = categoriasPerteneciente;
              }
            }

            this.marcas = marcas;
            console.log(this.marcas);
          },
          (errorMarcas) => {
            console.error('Error al obtener las marcas:', errorMarcas);
          }
        );
      },
      (errorCategorias) => {
        console.error('Error al obtener los categorias:', errorCategorias);
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
  eliminar(marca: any) {
    this.marcasService.deleteData(marca).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡La marca se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar la marca.'
        );
      },
    });
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.marcas?.length;
  }
}
