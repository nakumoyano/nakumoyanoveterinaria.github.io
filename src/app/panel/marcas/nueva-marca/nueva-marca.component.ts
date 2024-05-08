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
import { Categoria } from 'src/app/models/categoria/categoria';
import { Marca } from 'src/app/models/marca/marca';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MarcasService } from 'src/app/services/marcas/marcas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-marca',
  templateUrl: './nueva-marca.component.html',
  styleUrls: ['./nueva-marca.component.css'],
})
export class NuevaMarcaComponent implements OnInit {
  @Input() categorias: Categoria[];

  frmAddEditMarca: FormGroup;

  marca: Marca;
  isEdit = false;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedCategoria: string;

  private subscription = new Subscription();

  constructor(
    private marcaService: MarcasService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarDatosEnFormulario();

    this.cargarCmbCategorias();
  }

  // FUNCION PARA INICIALIZAR FORMULARIO
  createForm() {
    this.frmAddEditMarca = this.formBuilder.group({
      idEmpresa: [0],
      empresa: ['', Validators.required],
      idCategoria: ['', Validators.required],
    });
  }

  // FUNCION PARA CREAR UN PROVEEDOR
  cargarMarca() {
    const { idEmpresa, empresa, idCategoria } = this.frmAddEditMarca.value;

    if (this.frmAddEditMarca.valid) {
      this.marcaService.addData(idEmpresa, empresa, idCategoria).subscribe({
        next: () => {
          console.log(this.frmAddEditMarca.value);
          this.toastr.success('¡Marca cargada con éxito!');
          setTimeout(() => {
            this.frmAddEditMarca.reset();
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
      Object.values(this.frmAddEditMarca.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarMarca() {
    if (this.frmAddEditMarca.valid) {
      const body = {
        idEmpresa: this.frmAddEditMarca.value.idEmpresa,
        empresa: this.frmAddEditMarca.value.empresa,
        idCategoria: this.frmAddEditMarca.value.idCategoria,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar esta marca?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.marcaService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'La marca se ha editado correctamente.',
                  'success'
                );

                setTimeout(() => {
                  this.router
                    .navigate(['/admin/marcas/listado-de-marcas'])
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
                  'Ha ocurrido un error al intentar editar la marca. Por favor, inténtelo de nuevo más tarde.',
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
        this.marcaService.getDataById(id).subscribe(
          (marca: any) => {
            this.frmAddEditMarca.patchValue(marca.resultado);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // FUNCION PARA CARGAR EL COMBO DE CATEGORIAS
  cargarCmbCategorias() {
    this.categoriasService.getAllData().subscribe(
      (data: any) => {
        const categorias = data.resultado;

        this.categorias = categorias;
        // console.log(this.especies);
      },
      (error) => {
        console.log('Error al obtener las categorias', error);
      }
    );
  }

  // CONTROLES DEL FORMULARIO
  get controlMarca(): FormControl {
    return this.frmAddEditMarca.controls['empresa'] as FormControl;
  }
  get controlCategorias(): FormControl {
    return this.frmAddEditMarca.controls['idCategoria'] as FormControl;
  }
}
