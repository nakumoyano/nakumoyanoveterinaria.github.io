import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrls: ['./listado-proveedores.component.css'],
})
export class ListadoProveedoresComponent implements OnInit {
  @Input() proveedores: Proveedor[];

  constructor(
    private proveedoresService: ProveedoresService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // FUNCION PARA OBTENER TODOS LOS DATOS
  getAllDatos() {
    this.proveedoresService.getAllData().subscribe(
      (data: any) => {
        const proveedores = data.resultado;

        this.proveedores = proveedores;
        console.log(this.proveedores);
      },
      (error) => {
        console.error('Error al obtener los proveedores', error);
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
  eliminar(proveedor: any) {
    this.proveedoresService.deleteData(proveedor).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡El proveedor se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar el proveedor.'
        );
      },
    });
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.proveedores?.length;
  }
}
