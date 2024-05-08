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
import { Producto } from 'src/app/models/producto/producto';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { EspeciesService } from 'src/app/services/especies/especies.service';
import { MarcasService } from 'src/app/services/marcas/marcas.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css'],
})
export class NuevoProductoComponent implements OnInit {
  @Input() marcas: Marca[];
  @Input() categorias: Categoria[];
  @Input() proveedores: Proveedor[];

  frmAddEditProducto: FormGroup;
  producto: Producto;

  isEdit = false;

  private subscription = new Subscription();

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedCategoria: string;
  selectedMarca: string;

  constructor(
    private marcasService: MarcasService,
    private proveedoresService: ProveedoresService,
    private productoService: ProductosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarCmbProveedor();
    this.cargarDatosEnFormulario();
    this.cargarCmbCategorias();
  }

  // FUNCION PARA INICIALIZAR VALORES DEL FORMULARIO
  createForm() {
    this.frmAddEditProducto = this.formBuilder.group({
      idProducto: [0],
      idEmpresa: ['', Validators.required],
      idCategoria: ['', Validators.required],
      nombre: ['', Validators.required],
      stock: ['', Validators.required],
      stockMinimo: ['', Validators.required],
      precio: ['', Validators.required],
      codigo: [''],
      descripcion: [''],
    });
  }

  // FUNCION PARA CREAR UN PRODUCTO
  cargarProducto() {
    const {
      idProducto,
      nombre,
      descripcion,
      precio,
      stock,
      stockMinimo,
      codigo,
      idEmpresa,
      idCategoria,
    } = this.frmAddEditProducto.value;

    if (this.frmAddEditProducto.valid) {
      this.productoService
        .addData(
          idProducto,
          nombre,
          descripcion,
          precio,
          stock,
          stockMinimo,
          codigo,
          idEmpresa,
          idCategoria
        )
        .subscribe({
          next: () => {
            console.log(this.frmAddEditProducto.value);
            this.toastr.success('¡Producto cargado con éxito!');
            setTimeout(() => {
              this.frmAddEditProducto.reset();
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
      Object.values(this.frmAddEditProducto.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarProducto() {
    if (this.frmAddEditProducto.valid) {
      const body = {
        idProducto: this.frmAddEditProducto.value.idProducto,
        nombre: this.frmAddEditProducto.value.nombre,
        descripcion: this.frmAddEditProducto.value.descripcion,
        precio: this.frmAddEditProducto.value.precio,
        stock: this.frmAddEditProducto.value.stock,
        stockMinimo: this.frmAddEditProducto.value.stockMinimo,
        codigo: this.frmAddEditProducto.value.codigo,
        idEmpresa: this.frmAddEditProducto.value.idEmpresa,
        idCategoria: this.frmAddEditProducto.value.idCategoria,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.productoService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'El producto se ha editado correctamente.',
                  'success'
                );
                setTimeout(() => {
                  this.router
                    .navigate(['/admin/productos/listado-de-productos'])
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
                  'Ha ocurrido un error al intentar editar el producto. Por favor, inténtelo de nuevo más tarde.',
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
        this.productoService.getDataById(id).subscribe(
          (mascota: any) => {
            const formData = {
              ...mascota.resultado,
            };
            this.frmAddEditProducto.patchValue(formData);
            this.cargarMarcasPorCategoria(formData.idCategoria);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // FUNCION PARA CARGAR LAS RAZAS POR ESPECIE
  cargarMarcasPorCategoria(idCategoria: number) {
    console.log('ID de categoria:', idCategoria);

    this.marcasService.getDataMarcaByIdCategoria(idCategoria).subscribe(
      (data: any) => {
        console.log('Datos de marca:', data.resultado);
        this.marcas = data.resultado;
      },
      (error) => {
        console.log('Error al obtener las marcas de la categoria', error);
      }
    );
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

  // FUNCION PARA CARGAR EL COMBO DE PROVEEDORES
  cargarCmbProveedor() {
    this.proveedoresService.getAllData().subscribe(
      (data: any) => {
        const proveedores = data.resultado;

        this.proveedores = proveedores;
        // console.log(this.especies);
      },
      (error) => {
        console.log('Error al obtener los datos', error);
      }
    );
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlMarcas(): FormControl {
    return this.frmAddEditProducto.controls['idEmpresa'] as FormControl;
  }
  get controlProveedores(): FormControl {
    return this.frmAddEditProducto.controls['idProveedor'] as FormControl;
  }
  get controlCategorias(): FormControl {
    return this.frmAddEditProducto.controls['idCategoria'] as FormControl;
  }
  get controlNombre(): FormControl {
    return this.frmAddEditProducto.controls['nombre'] as FormControl;
  }
  get controlStockMinimo(): FormControl {
    return this.frmAddEditProducto.controls['stockMinimo'] as FormControl;
  }
  get controlStock(): FormControl {
    return this.frmAddEditProducto.controls['stock'] as FormControl;
  }
  get controlPrecio(): FormControl {
    return this.frmAddEditProducto.controls['precio'] as FormControl;
  }
  get controlCodigo(): FormControl {
    return this.frmAddEditProducto.controls['codigo'] as FormControl;
  }
}
