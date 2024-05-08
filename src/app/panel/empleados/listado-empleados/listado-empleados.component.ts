import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css'],
})
export class ListadoEmpleadosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  clickModalDelete() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este empleado?',
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
          'El empleado se ha eliminado correctamente.',
          'success'
        );
      }
    });
  }
}
