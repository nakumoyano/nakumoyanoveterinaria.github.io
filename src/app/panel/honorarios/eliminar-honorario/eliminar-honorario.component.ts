import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Honorario } from 'src/app/models/honorario/honorario';
import { HonorariosService } from 'src/app/services/honorarios/honorarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-honorario',
  templateUrl: './eliminar-honorario.component.html',
  styleUrls: ['./eliminar-honorario.component.css'],
})
export class EliminarHonorarioComponent implements OnInit {
  @Input() honorario: Honorario;
  @Output() onEliminado = new EventEmitter();

  private subscription = new Subscription();

  constructor(
    private honorarioService: HonorariosService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminar() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este honorario?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#4B5563',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.honorarioService.deleteData(this.honorario).subscribe({
            next: (response: any) => {
              if (response.statusCode === 204) {
                this.onEliminado.emit();
                Swal.fire(
                  '¡Eliminado!',
                  'El honorario se ha eliminado correctamente.',
                  'success'
                );
              } else {
              }
            },
            error: (error: any) => {
              Swal.fire(
                'Error!',
                'Ha ocurrido un error al intentar eliminar el honorario. Por favor, inténtelo de nuevo más tarde.',
                'error'
              );
            },
          })
        );
      }
    });
  }
}
