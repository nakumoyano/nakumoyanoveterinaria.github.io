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
import { Persona } from 'src/app/models/persona/persona';
import { Raza } from 'src/app/models/raza/raza';
import { Sexo } from 'src/app/models/sexo/sexo';
import { EspeciesService } from 'src/app/services/especies/especies.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { RazasService } from 'src/app/services/razas/razas.service';
import { SexosService } from 'src/app/services/sexos/sexos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
})
export class NuevoClienteComponent implements OnInit {
  @Input() especies: Especie[];
  @Input() razas: Raza[];
  @Input() sexos: Sexo[];
  @Input() personas: Persona[];

  frmAddEditMascota: FormGroup;
  frmAddEditPersona: FormGroup;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedEspecie: string;
  selectedRaza: string;
  selectedSexo: string;
  selectedPersona: string;

  isEdit = false;
  disabled = true;
  personaRegistrado: boolean = false;

  private subscription = new Subscription();

  constructor(
    private especieService: EspeciesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private razasService: RazasService,
    private sexosService: SexosService,
    private personasService: PersonasService,
    private mascotasService: MascotasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarCmbEspecie();
    // this.cargarCmbRazas();
    this.cargarCmbSexos();
    this.cargarCmbPersonas();
    this.cargarDatosEnFormulario();
  }

  // FUNCION PARA INICIALIZAR VALORES DEL FORMULARIO
  createForm() {
    this.frmAddEditMascota = this.formBuilder.group({
      idMascota: [0],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      manto: [''],
      peso: ['', Validators.required],
      castrado: [false],
      antecedentes: [''],
      idEspecie: ['', Validators.required],
      idRaza: ['', Validators.required],
      idSexo: ['', Validators.required],
      idPersona: ['', Validators.required],
      personaRegistrado: [true],
    });

    this.frmAddEditPersona = this.formBuilder.group({
      idPersona: [0],
      nombreCompleto: ['', Validators.required],
      celular: ['', Validators.required],
      domicilio: ['', Validators.required],
    });
  }

  // FUNCION PARA CREAR UNA MASCOTA
  cargarMascota() {
    const {
      idMascota,
      nombre,
      fechaNacimiento,
      manto,
      peso,
      castrado,
      antecedentes,
      idEspecie,
      idRaza,
      idSexo,
      idPersona,
    } = this.frmAddEditMascota.value;

    if (this.frmAddEditMascota.valid) {
      this.mascotasService
        .addData(
          idMascota,
          nombre,
          fechaNacimiento,
          manto,
          peso,
          castrado,
          antecedentes,
          idEspecie,
          idRaza,
          idSexo,
          idPersona
        )
        .subscribe({
          next: () => {
            // console.log(this.frmAddEditMascota.value);
            this.toastr.success('¡Mascota cargada con éxito!');
            setTimeout(() => {
              this.frmAddEditMascota.reset();
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
      Object.values(this.frmAddEditMascota.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCION PARA CREAR UNA PERSONA
  cargarPersona() {
    const { idPersona, nombreCompleto, celular, domicilio } =
      this.frmAddEditPersona.value;

    if (this.frmAddEditPersona.valid) {
      this.personasService
        .addData(idPersona, nombreCompleto, celular, domicilio)
        .subscribe({
          next: () => {
            console.log(this.frmAddEditPersona.value);
            this.toastr.success('¡Persona cargada con éxito!');
            setTimeout(() => {
              this.frmAddEditPersona.reset();
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
      Object.values(this.frmAddEditPersona.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarMascota() {
    if (this.frmAddEditMascota.valid) {
      const body = {
        idMascota: this.frmAddEditMascota.value.idMascota,
        nombre: this.frmAddEditMascota.value.nombre,
        fechaNacimiento: this.frmAddEditMascota.value.fechaNacimiento,
        manto: this.frmAddEditMascota.value.manto,
        peso: this.frmAddEditMascota.value.peso,
        castrado: this.frmAddEditMascota.value.castrado,
        antecedentes: this.frmAddEditMascota.value.antecedentes,
        idEspecie: this.frmAddEditMascota.value.idEspecie,
        idRaza: this.frmAddEditMascota.value.idRaza,
        idSexo: this.frmAddEditMascota.value.idSexo,
        idPersona: this.frmAddEditMascota.value.idPersona,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar esta mascota?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.mascotasService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'La mascota se ha editado correctamente.',
                  'success'
                );

                setTimeout(() => {
                  this.router
                    .navigate(['/admin/mascotas/listado-de-mascotas'])
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
                  'Ha ocurrido un error al intentar editar la mascota. Por favor, inténtelo de nuevo más tarde.',
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
        this.mascotasService.getDataById(id).subscribe(
          (mascota: any) => {
            const fecha = new Date(mascota.resultado.fechaNacimiento);
            const fechaFormateada = fecha.toISOString().split('T')[0];

            const formData = {
              ...mascota.resultado,
              fechaNacimiento: fechaFormateada,
            };
            this.frmAddEditMascota.patchValue(formData);
            this.cargarRazasPorEspecie(formData.idEspecie);
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

  // FUNCION PARA CARGAR LAS RAZAS POR ESPECIE
  cargarRazasPorEspecie(idEspecie: number) {
    console.log('ID de especie:', idEspecie);

    this.razasService.getDataRazaByIdEspecie(idEspecie).subscribe(
      (data: any) => {
        console.log('Datos de raza:', data.resultado);
        this.razas = data.resultado;
      },
      (error) => {
        console.log('Error al obtener las razas de la especie', error);
      }
    );
  }

  // FUNCION PARA CARGAR EL COMBO DE SEXO
  cargarCmbSexos() {
    this.sexosService.getAllData().subscribe(
      (data: any) => {
        const sexos = data.resultado;

        this.sexos = sexos;
        // console.log(this.especies);
      },
      (error) => {
        console.log('Error al obtener las sexos', error);
      }
    );
  }

  // FUNCION PARA CARGAR EL COMBO DE DUEÑOS
  cargarCmbPersonas() {
    this.personasService.getAllData().subscribe(
      (data: any) => {
        const personas = data.resultado;

        this.personas = personas;
        // console.log(this.especies);
      },
      (error) => {
        console.log('Error al obtener las personas', error);
      }
    );
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlEspecies(): FormControl {
    return this.frmAddEditMascota.controls['idEspecie'] as FormControl;
  }
  get controlPeso(): FormControl {
    return this.frmAddEditMascota.controls['peso'] as FormControl;
  }
  get controlRazas(): FormControl {
    return this.frmAddEditMascota.controls['idRaza'] as FormControl;
  }
  get controlNombre(): FormControl {
    return this.frmAddEditMascota.controls['nombre'] as FormControl;
  }
  get controlSexos(): FormControl {
    return this.frmAddEditMascota.controls['idSexo'] as FormControl;
  }
  get controlPersonas(): FormControl {
    return this.frmAddEditMascota.controls['idPersona'] as FormControl;
  }
  get controlFecha(): FormControl {
    return this.frmAddEditMascota.controls['fechaNacimiento'] as FormControl;
  }
  get controlManto(): FormControl {
    return this.frmAddEditMascota.controls['manto'] as FormControl;
  }

  // D******************************************** PERSONAS
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
