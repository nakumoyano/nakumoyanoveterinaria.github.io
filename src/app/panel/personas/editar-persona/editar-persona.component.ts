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
import { PersonasService } from 'src/app/services/personas/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css'],
})
export class EditarPersonaComponent implements OnInit {
  frmAddEditPersona: FormGroup;

  isEdit: boolean = false;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private personasService: PersonasService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarDatosEnFormulario();
  }

  createForm() {
    this.frmAddEditPersona = this.formBuilder.group({
      idPersona: [0],
      nombreCompleto: ['', Validators.required],
      celular: ['', Validators.required],
      domicilio: ['', Validators.required],
    });
  }

  // FUNCINO PARA CARGAR LOS DATOS EN EL FORMULARIO CUANDO SE QUIERE EDITAR
  cargarDatosEnFormulario() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;

        this.personasService.getDataById(id).subscribe(
          (persona: any) => {
            this.frmAddEditPersona.patchValue(persona.resultado);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarPersona() {
    if (this.frmAddEditPersona.valid) {
      const body = {
        idPersona: this.frmAddEditPersona.value.idPersona,
        nombreCompleto: this.frmAddEditPersona.value.nombreCompleto,
        celular: this.frmAddEditPersona.value.celular,
        domicilio: this.frmAddEditPersona.value.domicilio,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar este dueño?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.personasService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'El dueño se ha editado correctamente.',
                  'success'
                );

                setTimeout(() => {
                  this.router
                    .navigate(['/admin/duenios/listado-de-duenios'])
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
                  'Ha ocurrido un error al intentar editar el dueño. Por favor, inténtelo de nuevo más tarde.',
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

  get controlNombreDuenio(): FormControl {
    return this.frmAddEditPersona.controls['nombreCompleto'] as FormControl;
  }
  get controlCelular(): FormControl {
    return this.frmAddEditPersona.controls['celular'] as FormControl;
  }
  get controlDomicilio(): FormControl {
    return this.frmAddEditPersona.controls['domicilio'] as FormControl;
  }
}
