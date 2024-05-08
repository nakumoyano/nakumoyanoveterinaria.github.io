import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Especie } from 'src/app/models/especie/especie';
import { Raza } from 'src/app/models/raza/raza';
import { EspeciesService } from 'src/app/services/especies/especies.service';
import { RazasService } from 'src/app/services/razas/razas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-raza',
  templateUrl: './nueva-raza.component.html',
  styleUrls: ['./nueva-raza.component.css'],
})
export class NuevaRazaComponent implements OnInit {
  @Input() especies: Especie[];

  frmAddEditRaza: FormGroup;

  raza: Raza;
  isEdit = false;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedEspecie: string;

  private subscription = new Subscription();

  constructor(
    private razaService: RazasService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private especieService: EspeciesService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarDatosEnFormulario();

    this.cargarCmbEspecie();

    this.frmAddEditRaza = this.formBuilder.group({
      idRaza: [0],
      raza: ['', Validators.required],
      idEspecie: ['', Validators.required],
    });
  }

  // FUNCION PARA INICIALIZAR FORMULARIO
  createForm() {}

  // FUNCION PARA CREAR UN PROVEEDOR
  cargarRaza() {
    const { idRaza, raza, idEspecie } = this.frmAddEditRaza.value;

    if (this.frmAddEditRaza.valid) {
      this.razaService.addData(idRaza, raza, idEspecie).subscribe({
        next: () => {
          console.log(this.frmAddEditRaza.value);
          this.toastr.success('¡Raza cargada con éxito!');
          setTimeout(() => {
            this.frmAddEditRaza.reset();
            location.reload();
          }, 1000);
        },
        error: (error: any) => {
          this.toastr.error(
            'Ha ocurrido un error. Espere e intente nuevamente.'
          );
        },
      });
    } else {
      Object.values(this.frmAddEditRaza.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarRaza() {
    if (this.frmAddEditRaza.valid) {
      const body = {
        idRaza: this.frmAddEditRaza.value.idRaza,
        raza: this.frmAddEditRaza.value.raza,
        idEspecie: this.frmAddEditRaza.value.idEspecie,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar esta raza?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.razaService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'La raza se ha editado correctamente.',
                  'success'
                );

                setTimeout(() => {
                  this.router
                    .navigate(['/admin/razas/listado-de-razas'])
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
                  'Ha ocurrido un error al intentar editar la raza. Por favor, inténtelo de nuevo más tarde.',
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
        this.razaService.getDataById(id).subscribe(
          (raza: any) => {
            this.frmAddEditRaza.patchValue(raza.resultado);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // FUNCION PARA CARGAR EL COMBO DE ESPECIES
  cargarCmbEspecie() {
    this.especieService.getAllEspecies().subscribe(
      (dataEspecie: any) => {
        const especies = dataEspecie.resultado;

        this.especies = especies;
        // console.log(this.especies);
      },
      (errorEspecies) => {
        // console.error('Error al obtener las especies:', errorEspecies);
      }
    );
  }

  // CONTROLES DEL FORMULARIO
  get controlRaza(): FormControl {
    return this.frmAddEditRaza.controls['raza'] as FormControl;
  }
  get controlEspecies(): FormControl {
    return this.frmAddEditRaza.controls['idEspecie'] as FormControl;
  }
}
