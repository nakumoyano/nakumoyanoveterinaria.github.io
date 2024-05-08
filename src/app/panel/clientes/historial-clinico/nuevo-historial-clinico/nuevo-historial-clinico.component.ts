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
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas/historias-clinicas.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-historial-clinico',
  templateUrl: './nuevo-historial-clinico.component.html',
  styleUrls: ['./nuevo-historial-clinico.component.css'],
})
export class NuevoHistorialClinicoComponent implements OnInit {
  @Input() mascotas: Mascota[];

  frmAddEditHistorialClinico: FormGroup;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedMascota: string;

  imageFile: File | undefined;

  private subscription = new Subscription();

  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private historialService: HistoriasClinicasService,
    private mascotasService: MascotasService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarCmbMascotas();

    this.cargarDatosEnFormulario();

    this.frmAddEditHistorialClinico.controls['archivos'].valueChanges.subscribe(
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
    this.frmAddEditHistorialClinico = this.formBuilder.group({
      idHistoriaClinica: [0],
      idMascota: ['', Validators.required],
      fechaHora: ['', Validators.required],
      archivos: [,],
      detalles: [''],
      motivo: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  // FUNCION PARA CREAR UNA MASCOTA
  cargarHistorialClinico() {
    const { idHistoriaClinica, fechaHora, motivo, detalles, idMascota } =
      this.frmAddEditHistorialClinico.value;

    if (this.frmAddEditHistorialClinico.valid) {
      this.historialService
        .addData(
          idHistoriaClinica,
          fechaHora,
          motivo,
          detalles,
          idMascota,
          this.imageFile
        )
        .subscribe({
          next: () => {
            // console.log(this.frmAddEditMascota.value);
            this.toastr.success('¡Historial clínico cargado con éxito!');
            setTimeout(() => {
              this.frmAddEditHistorialClinico.reset();
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
      Object.values(this.frmAddEditHistorialClinico.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarHistorialClinico() {
    if (this.frmAddEditHistorialClinico.valid) {
      const body = {
        idHistoriaClinica:
          this.frmAddEditHistorialClinico.value.idHistoriaClinica,
        fechaHora: this.frmAddEditHistorialClinico.value.fechaHora,
        motivo: this.frmAddEditHistorialClinico.value.motivo,
        detalles: this.frmAddEditHistorialClinico.value.detalles,
        archivos: this.frmAddEditHistorialClinico.value.archivos,
        idMascota: this.frmAddEditHistorialClinico.value.idMascota,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar esta historia clínica?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.historialService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'La historia clínica se ha editado correctamente.',
                  'success'
                );

                setTimeout(() => {
                  this.router
                    .navigate(['/admin/mascotas/historiales-clinicos'])
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
                  'Ha ocurrido un error al intentar editar la historia clínica. Por favor, inténtelo de nuevo más tarde.',
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
        this.historialService.getDataById(id).subscribe(
          (historial: any) => {
            // Convertir la fecha al formato YYYY-MM-DD
            const fecha = new Date(historial.resultado.fechaHora);
            const fechaFormateada = fecha.toISOString().split('T')[0];
            // Asignar la fecha formateada al formulario
            const formData = {
              ...historial.resultado,
              fechaHora: fechaFormateada,
            };
            this.frmAddEditHistorialClinico.patchValue(formData);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // FUNCION PARA CARGAR EL COMBO DE DUEÑOS
  cargarCmbMascotas() {
    this.mascotasService.getAllData().subscribe(
      (data: any) => {
        const mascotas = data.resultado;

        this.mascotas = mascotas;
        // console.log(this.especies);
      },
      (error) => {
        console.log('Error al obtener las mascotas', error);
      }
    );
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlMascota(): FormControl {
    return this.frmAddEditHistorialClinico.controls['idMascota'] as FormControl;
  }
  get controlFecha(): FormControl {
    return this.frmAddEditHistorialClinico.controls['fechaHora'] as FormControl;
  }
  get controlMotivo(): FormControl {
    return this.frmAddEditHistorialClinico.controls['motivo'] as FormControl;
  }
}
