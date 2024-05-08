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
import { Mascota } from 'src/app/models/mascota/mascota';
import { Persona } from 'src/app/models/persona/persona';
import { InternacionesService } from 'src/app/services/internaciones/internaciones.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-internacion',
  templateUrl: './nueva-internacion.component.html',
  styleUrls: ['./nueva-internacion.component.css'],
})
export class NuevaInternacionComponent implements OnInit {
  @Input() personas: Persona[];
  @Input() mascotas: Mascota[];

  frmAddEditInternacion: FormGroup;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedPersona: string;
  selectedMascota: string;

  imageFile: File | undefined;

  private subscription = new Subscription();

  isEdit = false;

  constructor(
    private personasService: PersonasService,
    private formBuilder: FormBuilder,
    private mascotasService: MascotasService,
    private internacionService: InternacionesService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.cargarCmbPersonas();

    this.cargarDatosEnFormulario();

    this.frmAddEditInternacion.controls['archivos'].valueChanges.subscribe(
      (value) => {
        if (value && value.files && value.files.length > 0) {
          this.imageFile = value.files[0];
        } else {
          this.imageFile = undefined;
        }
      }
    );
  }

  // FUNCION PARA INICIALIZAR VALORES DEL FORMULARIO
  createForm() {
    this.frmAddEditInternacion = this.formBuilder.group({
      idInternacion: [0],
      idPersona: ['', Validators.required],
      idMascota: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      fechaEgreso: ['', Validators.required],
      costoPorDia: ['', Validators.required],
      costoTotal: ['', Validators.required],
      saldoPagado: [''],
      pagado: [false],
      archivos: [,],
      descripcion: [''],
    });
  }

  // FUNCION PARA CREAR UNA MASCOTA
  cargarInternacion() {
    const {
      idInternacion,
      fechaIngreso,
      fechaEgreso,
      costoPorDia,
      costoTotal,
      saldoPagado,
      pagado,
      descripcion,
      idMascota,
    } = this.frmAddEditInternacion.value;

    if (this.frmAddEditInternacion.valid) {
      this.internacionService
        .addData(
          idInternacion,
          fechaIngreso,
          fechaEgreso,
          costoPorDia,
          costoTotal,
          saldoPagado,
          pagado,
          descripcion,
          idMascota,
          this.imageFile
        )
        .subscribe({
          next: () => {
            this.toastr.success('¡Internación cargada con éxito!');
            setTimeout(() => {
              this.frmAddEditInternacion.reset();
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
      Object.values(this.frmAddEditInternacion.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarInternacion() {
    if (this.frmAddEditInternacion.valid) {
      const body = {
        idInternacion: this.frmAddEditInternacion.value.idInternacion,
        fechaIngreso: this.frmAddEditInternacion.value.fechaIngreso,
        fechaEgreso: this.frmAddEditInternacion.value.fechaEgreso,
        costoPorDia: this.frmAddEditInternacion.value.costoPorDia,
        costoTotal: this.frmAddEditInternacion.value.costoTotal,
        saldoPagado: this.frmAddEditInternacion.value.saldoPagado,
        pagado: this.frmAddEditInternacion.value.pagado,
        descripcion: this.frmAddEditInternacion.value.descripcion,
        archivos: this.frmAddEditInternacion.value.archivos,
        idMascota: this.frmAddEditInternacion.value.idMascota,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar esta internación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.internacionService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'La internación se ha editado correctamente.',
                  'success'
                );

                setTimeout(() => {
                  this.router
                    .navigate(['/admin/mascotas/listado-de-internaciones'])
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
                  'Ha ocurrido un error al intentar editar la internación. Por favor, inténtelo de nuevo más tarde.',
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
        this.internacionService.getDataById(id).subscribe(
          (internacionData: any) => {
            const mascotaId = internacionData.resultado.idMascota;
            // Obtener datos de la mascota para obtener el ID de la persona
            this.mascotasService.getDataById(mascotaId).subscribe(
              (mascotaData: any) => {
                const idPersona = mascotaData.resultado.idPersona;
                // Obtener datos de la persona
                this.personasService.getDataById(idPersona).subscribe(
                  (personaData: any) => {
                    const persona = personaData.resultado;
                    // Formatear fechas
                    const fechaIngreso = new Date(
                      internacionData.resultado.fechaIngreso
                    )
                      .toISOString()
                      .split('T')[0];
                    const fechaEgreso = new Date(
                      internacionData.resultado.fechaEgreso
                    )
                      .toISOString()
                      .split('T')[0];
                    // Combinar datos de la internación, la mascota y la persona
                    const formData = {
                      ...internacionData.resultado,
                      idPersona: persona.idPersona,
                      nombreCompleto: persona.nombreCompleto,
                      fechaIngreso: fechaIngreso,
                      fechaEgreso: fechaEgreso,
                    };
                    // Asignar los datos combinados al formulario
                    this.frmAddEditInternacion.patchValue(formData);
                    // Cargar mascotas relacionadas con el dueño seleccionado
                    this.cargarMascotasPorPersona(persona.idPersona);
                  },
                  (error: any) => {
                    console.error(
                      'Error al obtener los datos de la persona:',
                      error
                    );
                  }
                );
              },
              (error: any) => {
                console.error(
                  'Error al obtener los datos de la mascota:',
                  error
                );
              }
            );
          },
          (error) => {
            console.error(
              'Error al obtener los datos de la internación:',
              error
            );
          }
        );
      }
    });
  }

  // FUNCION PARA CARGAR EL COMBO DE DUEÑOS
  cargarCmbPersonas() {
    this.personasService.getAllData().subscribe(
      (data: any) => {
        const personas = data.resultado;
        this.personas = personas;

        // Si hay personas, cargar las mascotas correspondientes a la primera persona
        if (personas.length > 0) {
          this.cargarMascotasPorPersona(personas);
        }
      },
      (error) => {
        console.log('Error al obtener las personas', error);
      }
    );
  }

  // FUNCION PARA CARGAR LAS MASCOTAS SEGÚN LA PERSONA SELECCIONADA
  cargarMascotasPorPersona(idPersona: number) {
    this.mascotasService.getMascotaByIdPersona(idPersona).subscribe(
      (data: any) => {
        this.mascotas = data.resultado;
      },
      (error) => {
        console.log('Error al obtener las mascotas de la persona', error);
      }
    );
  }

  // FUNCION PARA LIMPIAR DROPDOWNS
  limpiarMascotas() {
    this.mascotas = [];
  }
  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlPersonas(): FormControl {
    return this.frmAddEditInternacion.controls['idPersona'] as FormControl;
  }
  get controlMascota(): FormControl {
    return this.frmAddEditInternacion.controls['idMascota'] as FormControl;
  }
  get controlFechaIngreso(): FormControl {
    return this.frmAddEditInternacion.controls['fechaIngreso'] as FormControl;
  }
  get controlFechaEgreso(): FormControl {
    return this.frmAddEditInternacion.controls['fechaEgreso'] as FormControl;
  }
  get controlCostoPorDia(): FormControl {
    return this.frmAddEditInternacion.controls['costoPorDia'] as FormControl;
  }
  get controlCostoTotal(): FormControl {
    return this.frmAddEditInternacion.controls['costoTotal'] as FormControl;
  }
  get controlSalgoPagado(): FormControl {
    return this.frmAddEditInternacion.controls['saldoPagado'] as FormControl;
  }
}
