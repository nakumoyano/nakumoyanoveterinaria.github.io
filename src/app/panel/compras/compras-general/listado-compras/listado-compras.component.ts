import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-compras',
  templateUrl: './listado-compras.component.html',
  styleUrls: ['./listado-compras.component.css'],
})
export class ListadoComprasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  clickModalDelete() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta compra?',
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
          'La compra se ha eliminado correctamente.',
          'success'
        );
      }
    });
  }
}
