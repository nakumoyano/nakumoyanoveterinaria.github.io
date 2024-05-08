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
import { Producto } from 'src/app/models/producto/producto';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { RecordatoriosService } from 'src/app/services/recordatorios/recordatorios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-recordatorio',
  templateUrl: './crear-recordatorio.component.html',
  styleUrls: ['./crear-recordatorio.component.css'],
})
export class CrearRecordatorioComponent implements OnInit {
  @Input() personas: Persona[];
  @Input() mascotas: Mascota[];
  @Input() productos: Producto[];

  frmAddEditRecordatorio: FormGroup;

  isEdit: boolean = false;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedPersona: string;
  selectedMascota: string;
  selectedProducto: string;

  existe: true;
  private subscription = new Subscription();

  constructor(
    private personasService: PersonasService,
    private formBuilder: FormBuilder,
    private mascotasService: MascotasService,
    private recordatoriosService: RecordatoriosService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductosService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.cargarCmbPersonas();
    this.cargarCmbProductos();

    this.cargarDatosEnFormulario();
  }

  // FUNCION PARA INICIALIZAR VALORES DEL FORMULARIO
  createForm() {
    this.frmAddEditRecordatorio = this.formBuilder.group({
      idRecordatorio: [0],
      fecha: [''],
      precio: ['', Validators.required],
      telefono: [''],
      motivo: [''],
      mensajePredeterminado: [''],
      registrado: [false],
      nombreMascota: [''],
      nombreCompletoPersona: [''],
      idMascota: [''],
      idProducto: [''],
      idPersona: [''],
    });
  }

  // FUNCION PARA CREAR RECORDATORIO
  cargarRecordatorio() {
    const {
      idRecordatorio,
      fecha,
      precio,
      telefono,
      motivo,
      mensajePredeterminado,
      registrado,
      nombreMascota,
      nombreCompletoPersona,
      idMascota,
      idProducto,
    } = this.frmAddEditRecordatorio.value;

    const idMascotaFinal = this.selectedMascota ? idMascota : null;
    const idProductoFinal = this.selectedProducto ? idProducto : null;

    if (this.frmAddEditRecordatorio.valid) {
      this.recordatoriosService
        .addData(
          idRecordatorio,
          fecha,
          precio,
          telefono,
          motivo,
          mensajePredeterminado,
          registrado,
          nombreMascota,
          nombreCompletoPersona,
          idMascotaFinal,
          idProductoFinal
        )
        .subscribe({
          next: () => {
            // console.log(this.frmAddEditMascota.value);
            this.toastr.success('¡Recordatorio cargado con éxito!');
            setTimeout(() => {
              this.frmAddEditRecordatorio.reset();
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
      Object.values(this.frmAddEditRecordatorio.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarRecordatorio() {
    if (this.frmAddEditRecordatorio.valid) {
      const body = {
        idRecordatorio: this.frmAddEditRecordatorio.value.idRecordatorio,
        fecha: this.frmAddEditRecordatorio.value.fecha,
        precio: this.frmAddEditRecordatorio.value.precio,
        telefono: this.frmAddEditRecordatorio.value.telefono,
        motivo: this.frmAddEditRecordatorio.value.motivo,
        mensajePredeterminado:
          this.frmAddEditRecordatorio.value.mensajePredeterminado,
        registrado: this.frmAddEditRecordatorio.value.registrado,
        nombreMascota: this.frmAddEditRecordatorio.value.nombreMascota,
        nombreCompletoPersona:
          this.frmAddEditRecordatorio.value.nombreCompletoPersona,
        idMascota: this.frmAddEditRecordatorio.value.idMascota,
        idProducto: this.frmAddEditRecordatorio.value.idProducto,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar este recordatorio?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.recordatoriosService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'El recordatorio se ha editado correctamente.',
                  'success'
                );

                setTimeout(() => {
                  this.router
                    .navigate([
                      '/admin/recordatorios/listado-de-recordatorios-general',
                    ])
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
                  'Ha ocurrido un error al intentar editar el recodatorio. Por favor, inténtelo de nuevo más tarde.',
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
        this.recordatoriosService.getDataById(id).subscribe(
          (recordatorioData: any) => {
            // Obtener datos del recordatorio
            const recordatorio = recordatorioData.resultado;
            // Formatear fechas
            const fecha = new Date(recordatorio.fecha)
              .toISOString()
              .split('T')[0];
            // Asignar los datos del recordatorio al formulario
            this.frmAddEditRecordatorio.patchValue({
              idRecordatorio: recordatorio.idRecordatorio,
              fecha: fecha,
              precio: recordatorio.precio,
              telefono: recordatorio.telefono,
              motivo: recordatorio.motivo,
              mensajePredeterminado: recordatorio.mensajePredeterminado,
              registrado: recordatorio.registrado,
              idMascota: recordatorio.idMascota,
              idProducto: recordatorio.idProducto,
              nombreMascota: recordatorio.nombreMascota,
              nombreCompletoPersona: recordatorio.nombreCompletoPersona,
            });

            // Si hay una mascota seleccionada, cargar las mascotas relacionadas con la persona seleccionada
            if (recordatorio.idMascota) {
              // Obtener datos de la mascota
              this.mascotasService
                .getDataById(recordatorio.idMascota)
                .subscribe(
                  (mascotaData: any) => {
                    const mascota = mascotaData.resultado;
                    // Asignar el nombre de la mascota al formulario
                    this.frmAddEditRecordatorio.patchValue({
                      idMascota: recordatorio.idMascota, // Asignar el ID de la mascota
                      nombreMascota: mascota.nombre,
                    });
                    this.cargarMascotasPorPersona(mascota.idPersona);
                    // Obtener datos de la persona asociada a la mascota
                    this.personasService
                      .getDataById(mascota.idPersona)
                      .subscribe(
                        (personaData: any) => {
                          const persona = personaData.resultado;
                          // Asignar los datos de la persona al formulario
                          this.frmAddEditRecordatorio.patchValue({
                            idPersona: persona.idPersona,
                            nombreCompletoPersona: persona.nombreCompleto,
                          });
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
            }
          },
          (error) => {
            console.error(
              'Error al obtener los datos del recordatorio:',
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
    console.log('ID de persona:', idPersona); // Verificar que se esté recibiendo el ID de la persona correctamente

    this.mascotasService.getMascotaByIdPersona(idPersona).subscribe(
      (data: any) => {
        console.log('Datos de mascotas:', data.resultado); // Verificar los datos recibidos de las mascotas
        this.mascotas = data.resultado;
      },
      (error) => {
        console.log('Error al obtener las mascotas de la persona', error);
      }
    );
  }

  // FUNCION PARA CARGAR EL COMBO DE PRODUCTOS
  cargarCmbProductos() {
    this.productoService.getAllData().subscribe(
      (data: any) => {
        const productos = data.resultado;

        this.productos = productos;
      },
      (error) => {
        console.log('Error al obtener los productos', error);
      }
    );
  }

  // FUNCION PARA LIMPIAR DROPDOWNS
  limpiarMascotas() {
    this.mascotas = [];
  }

  volverListado() {
    this.router.navigate([
      'admin/recordatorios/listado-de-recordatorios-general',
    ]);
    this.recargar();
  }

  // RECARGAR PAGINA AL IR EDITAR PARA QUE NO SE BUGUEE LOS DROPDOWN
  recargar() {
    setTimeout(() => {
      location.reload();
    }, 100);
  }
  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlPersonas(): FormControl {
    return this.frmAddEditRecordatorio.controls['idPersona'] as FormControl;
  }
  get controlMascota(): FormControl {
    return this.frmAddEditRecordatorio.controls['idMascota'] as FormControl;
  }
  get controlFecha(): FormControl {
    return this.frmAddEditRecordatorio.controls['fecha'] as FormControl;
  }
  get controlTelefono(): FormControl {
    return this.frmAddEditRecordatorio.controls['telefono'] as FormControl;
  }
  get controlPrecio(): FormControl {
    return this.frmAddEditRecordatorio.controls['precio'] as FormControl;
  }
  get controlMotivo(): FormControl {
    return this.frmAddEditRecordatorio.controls['motivo'] as FormControl;
  }
}
