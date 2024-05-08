import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Internacion } from 'src/app/models/internacion/internacion';
import { InternacionesService } from 'src/app/services/internaciones/internaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-internacion',
  templateUrl: './eliminar-internacion.component.html',
  styleUrls: ['./eliminar-internacion.component.css'],
})
export class EliminarInternacionComponent implements OnInit {
  @Input() internacion: Internacion;
  @Output() onEliminado = new EventEmitter();

  private subscription = new Subscription();

  constructor(
    private internacionService: InternacionesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminar() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta internación?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#4B5563',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.internacionService.deleteData(this.internacion).subscribe({
            next: (response: any) => {
              if (response.statusCode === 204) {
                this.onEliminado.emit();
                Swal.fire(
                  '¡Eliminado!',
                  'La internación se ha eliminado correctamente.',
                  'success'
                );
              } else {
              }
            },
            error: (error: any) => {
              console.log(error);
              Swal.fire(
                'Error!',
                'Ha ocurrido un error al intentar eliminar la internación. Por favor, inténtelo de nuevo más tarde.',
                'error'
              );
            },
          })
        );
      }
    });
  }
}
