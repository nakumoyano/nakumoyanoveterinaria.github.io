import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HistoriaClinica } from 'src/app/models/historia-clinica/historia-clinica';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas/historias-clinicas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-historial-clinico',
  templateUrl: './eliminar-historial-clinico.component.html',
  styleUrls: ['./eliminar-historial-clinico.component.css'],
})
export class EliminarHistorialClinicoComponent implements OnInit {
  @Input() historialClinico: HistoriaClinica;
  @Output() onEliminado = new EventEmitter();

  private subscription = new Subscription();

  constructor(
    private historialClinicoService: HistoriasClinicasService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminar() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta historia clínica?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#4B5563',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.historialClinicoService
            .deleteData(this.historialClinico)
            .subscribe({
              next: (response: any) => {
                if (response.statusCode === 204) {
                  this.onEliminado.emit();
                  Swal.fire(
                    '¡Eliminado!',
                    'La historia clínica se ha eliminado correctamente.',
                    'success'
                  );
                } else {
                }
              },
              error: (error: any) => {
                console.log(error);
                Swal.fire(
                  'Error!',
                  'Ha ocurrido un error al intentar eliminar la historia clínica . Por favor, inténtelo de nuevo más tarde.',
                  'error'
                );
              },
            })
        );
      }
    });
  }
}
