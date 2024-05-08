import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css'],
})
export class ListadoVentasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  clickModalDelete() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta venta?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#4B5563',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'La venta se ha eliminado correctamente.',
          'success'
        );
      }
    });
  }
}
