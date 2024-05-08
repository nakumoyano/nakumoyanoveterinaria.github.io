import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Honorario } from 'src/app/models/honorario/honorario';
import { GalenosHonorariosService } from 'src/app/services/galenos/galenos-honorarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-honorario',
  templateUrl: './agregar-honorario.component.html',
  styleUrls: ['./agregar-honorario.component.css'],
})
export class AgregarHonorarioComponent implements OnInit {
  frmAddEditHonorario: FormGroup;

  honorarios: Honorario;

  isEdit = false;

  private subscription = new Subscription();

  constructor(
    private galenosHonorariosService: GalenosHonorariosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarDatosEnFormulario();
  }

  // FUNCION PARA INICIALIZAR VALORES DEL FORMULARIO
  createForm() {
    this.frmAddEditHonorario = this.formBuilder.group({
      idHonorario: [0],
      nombreHonorario: ['', Validators.required],
      galenos: ['', Validators.required],
    });
  }

  // FUNCION PARA CREAR
  cargarHonorario() {
    const { idHonorario, nombreHonorario, galenos } =
      this.frmAddEditHonorario.value;

    if (this.frmAddEditHonorario.valid) {
      this.galenosHonorariosService
        .addDataHonorario(idHonorario, nombreHonorario, galenos)
        .subscribe({
          next: () => {
            console.log(this.frmAddEditHonorario.value);
            this.toastr.success('¡Honorario cargado con éxito!');
            this.frmAddEditHonorario.reset();
          },
          error: (error: any) => {
            this.toastr.error(
              'Ha ocurrido un error. Espere e intente nuevamente.'
            );
          },
        });
    } else {
      Object.values(this.frmAddEditHonorario.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarHonorario() {
    if (this.frmAddEditHonorario.valid) {
      const body = {
        idHonorario: this.frmAddEditHonorario.value.idHonorario,
        nombreHonorario: this.frmAddEditHonorario.value.nombreHonorario,
        galenos: this.frmAddEditHonorario.value.galenos,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar este honorario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.galenosHonorariosService.updateDataHonorario(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'El honorario se ha editado correctamente.',
                  'success'
                );
                setTimeout(() => {
                  this.router
                    .navigate(['/admin/honorarios/listado-de-honorarios'])
                    .then(() => {
                      setTimeout(() => {
                        location.reload();
                      }, 10);
                    });
                }, 1000);
              },
              error: (error: any) => {
                Swal.fire(
                  'Error!',
                  'Ha ocurrido un error al intentar editar el honorario. Por favor, inténtelo de nuevo más tarde.',
                  'error'
                );
              },
            })
          );
        }
      });
    } else {
      this.toastr.error(
        'Ocurrio un error, revise los campos e intente nuevamente'
      );
    }
  }

  // FUNCINO PARA CARGAR LOS DATOS EN EL FORMULARIO CUANDO SE QUIERE EDITAR
  cargarDatosEnFormulario() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.galenosHonorariosService.getDataByIdHonorario(id).subscribe(
          (honorario: any) => {
            this.frmAddEditHonorario.patchValue(honorario.resultado);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlNombreHonorario(): FormControl {
    return this.frmAddEditHonorario.controls['nombreHonorario'] as FormControl;
  }
  get controlGaleno(): FormControl {
    return this.frmAddEditHonorario.controls['galenos'] as FormControl;
  }
}
