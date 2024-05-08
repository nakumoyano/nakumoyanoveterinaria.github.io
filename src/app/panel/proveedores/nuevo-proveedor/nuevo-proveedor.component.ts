import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css'],
})
export class NuevoProveedorComponent implements OnInit {
  frmAddEditProveedor: FormGroup;

  isEdit = false;

  private subscription = new Subscription();

  constructor(
    private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarDatosEnFormulario();

    this.frmAddEditProveedor = this.formBuilder.group({
      idProveedor: [0],
      nombreCompleto: ['', Validators.required],
      cuit: ['', [Validators.required]],
      nombreEmpresa: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  // FUNCION PARA INICIALIZAR FORMULARIO
  createForm() {}

  // FUNCION PARA CREAR UN PROVEEDOR
  cargarProveedor() {
    const {
      idProveedor,
      nombreCompleto,
      nombreEmpresa,
      telefono,
      direccion,
      cuit,
    } = this.frmAddEditProveedor.value;

    if (this.frmAddEditProveedor.valid) {
      this.proveedorService
        .addData(
          idProveedor,
          nombreCompleto,
          nombreEmpresa,
          telefono,
          direccion,
          cuit
        )
        .subscribe({
          next: () => {
            console.log(this.frmAddEditProveedor.value);
            this.toastr.success('Proveedor cargado con éxito!');
            this.frmAddEditProveedor.reset();
          },
          error: (error: any) => {
            this.toastr.error(
              'Ha ocurrido un error. Espere e intente nuevamente.'
            );
          },
        });
    } else {
      Object.values(this.frmAddEditProveedor.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarProveedor() {
    if (this.frmAddEditProveedor.valid) {
      const body = {
        idProveedor: this.frmAddEditProveedor.value.idProveedor,
        nombreCompleto: this.frmAddEditProveedor.value.nombreCompleto,
        nombreEmpresa: this.frmAddEditProveedor.value.nombreEmpresa,
        telefono: this.frmAddEditProveedor.value.telefono,
        direccion: this.frmAddEditProveedor.value.direccion,
        cuit: this.frmAddEditProveedor.value.cuit,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar este proveedor?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.proveedorService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  'Editado!',
                  'El proveedor se ha editado correctamente.',
                  'success'
                );
                setTimeout(() => {
                  this.router
                    .navigate(['/admin/proveedores/listado-de-proveedores'])
                    .then(() => {
                      setTimeout(() => {
                        location.reload();
                      }, 100);
                    });
                }, 1000);
              },
              error: (error: any) => {
                console.log(error);
                this.toastr.error(
                  'Ha ocurrido un error. Espere e intente nuevamente.'
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
        this.proveedorService.getDataById(id).subscribe(
          (proveedor: any) => {
            this.frmAddEditProveedor.patchValue(proveedor.resultado);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // RECARGAR PAGINA AL IR EDITAR PARA QUE NO SE BUGUEE LOS DROPDOWN
  recargar() {
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  // CONTROLES DEL FORMULARIO
  get controlNombreCompleto(): FormControl {
    return this.frmAddEditProveedor.controls['nombreCompleto'] as FormControl;
  }
  get controlNombreEmpresa(): FormControl {
    return this.frmAddEditProveedor.controls['nombreEmpresa'] as FormControl;
  }
  get controlDireccion(): FormControl {
    return this.frmAddEditProveedor.controls['direccion'] as FormControl;
  }
  get controlTelefono(): FormControl {
    return this.frmAddEditProveedor.controls['telefono'] as FormControl;
  }
  get controlCuit(): FormControl {
    return this.frmAddEditProveedor.controls['cuit'] as FormControl;
  }
}
