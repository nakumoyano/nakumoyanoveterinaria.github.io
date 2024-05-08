import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-elemento',
  templateUrl: './eliminar-elemento.component.html',
  styleUrls: ['./eliminar-elemento.component.css'],
})
export class EliminarElementoComponent {
  @Input() elemento: any;
  @Output() eliminado = new EventEmitter();

  private subscription = new Subscription();

  constructor(private toastr: ToastrService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  confirmarEliminacion() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este dato?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#4B5563',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminado.emit(this.elemento);
      }
    });
  }
}
