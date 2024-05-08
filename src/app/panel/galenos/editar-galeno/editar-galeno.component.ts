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
import { Galeno } from 'src/app/models/galeno/galeno';
import { GalenosService } from 'src/app/services/galenos/galenos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-galeno',
  templateUrl: './editar-galeno.component.html',
  styleUrls: ['./editar-galeno.component.css'],
})
export class EditarGalenoComponent implements OnInit {
  frmAddEditGaleno: FormGroup;
  galeno: Galeno;
  isEdit = false;

  private subscription = new Subscription();

  constructor(
    private galenosService: GalenosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarDatosEnFormulario();

    this.frmAddEditGaleno = this.formBuilder.group({
      idGaleno: [0],
      precioGaleno: ['', Validators.required],
      fechaActualizacion: [''],
    });
  }

  // FUNCION PARA INICIALIZAR FORMULARIO
  createForm() {}

  // FUNCNION PARA EDITAR FORMULARIO
  editarGaleno() {
    if (this.frmAddEditGaleno.valid) {
      const body = {
        idGaleno: this.frmAddEditGaleno.value.idGaleno,
        precioGaleno: this.frmAddEditGaleno.value.precioGaleno,
        fechaActualizacion: this.frmAddEditGaleno.value.fechaActualizacion,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar este galeno?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.galenosService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'El galeno se ha editado correctamente.',
                  'success'
                );
                setTimeout(() => {
                  this.router
                    .navigate(['/admin/galenos/listado-galenos'])
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
                  'Ha ocurrido un error al intentar editar el galeno. Por favor, inténtelo de nuevo más tarde.',
                  'error'
                );
              },
            })
          );
        }
      });
    } else {
      // Mostrar mensaje de validación si el formulario no es válido
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
        this.galenosService.getDataById(id).subscribe(
          (marca: any) => {
            this.frmAddEditGaleno.patchValue(marca.resultado);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // CONTROLES DEL FORMULARIO
  get controlNombreGaleno(): FormControl {
    return this.frmAddEditGaleno.controls['precioGaleno'] as FormControl;
  }
  get controlFechaActualizacion(): FormControl {
    return this.frmAddEditGaleno.controls['fechaActualizacion'] as FormControl;
  }
}
