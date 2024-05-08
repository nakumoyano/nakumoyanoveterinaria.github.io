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
import { Prioridad } from 'src/app/models/prioridad/prioridad';
import { Producto } from 'src/app/models/producto/producto';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { PrioridadesService } from 'src/app/services/prioridades/prioridades.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-compra-realizar',
  templateUrl: './nueva-compra-realizar.component.html',
  styleUrls: ['./nueva-compra-realizar.component.css'],
})
export class NuevaCompraRealizarComponent implements OnInit {
  @Input() productos: Producto[];
  @Input() prioridades: Prioridad[];

  frmAddEditCompraRealizar: FormGroup;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedProducto: string;
  selectedPrioridad: string;

  productoRegistrado: boolean = true;

  isEdit = false;

  private subscription = new Subscription();

  constructor(
    private productoService: ProductosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private prioridadesService: PrioridadesService,
    private compraRealizarService: ComprasService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.cargarCmbProcuctos();
    this.cargarCmbPrioridad();

    this.cargarDatosEnFormulario();
  }

  // FUNCION PARA INICLIZAR CAMPOS FORMULARIO
  createForm() {
    this.frmAddEditCompraRealizar = this.formBuilder.group({
      idCompra: [0],
      productoRegistrado: [true],
      idProducto: ['', Validators.required],
      cantidad: ['', Validators.required],
      fecha: ['', Validators.required],
      idPrioridad: ['', Validators.required],
    });
  }

  // FUNCION PARA CREAR UNA COMPRA A REALIZAR
  cargarCompra() {
    const {
      idCompra,
      productoRegistrado,
      idProducto,
      idPrioridad,
      cantidad,
      fecha,
    } = this.frmAddEditCompraRealizar.value;

    if (this.frmAddEditCompraRealizar.valid) {
      this.compraRealizarService
        .addData(
          idCompra,
          productoRegistrado,
          idProducto,
          idPrioridad,
          cantidad,
          fecha
        )
        .subscribe({
          next: () => {
            // console.log(this.frmAddEditMascota.value);
            this.toastr.success('¡Compra a realizar cargada con éxito!');
            setTimeout(() => {
              this.frmAddEditCompraRealizar.reset();
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
      Object.values(this.frmAddEditCompraRealizar.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // FUNCNION PARA EDITAR FORMULARIO
  editarCompraRealizar() {
    if (this.frmAddEditCompraRealizar.valid) {
      const body = {
        idCompra: this.frmAddEditCompraRealizar.value.idCompra,
        productoRegistrado:
          this.frmAddEditCompraRealizar.value.productoRegistrado,
        idProducto: this.frmAddEditCompraRealizar.value.idProducto,
        idPrioridad: this.frmAddEditCompraRealizar.value.idPrioridad,
        cantidad: this.frmAddEditCompraRealizar.value.cantidad,
        fecha: this.frmAddEditCompraRealizar.value.fecha,
      };
      Swal.fire({
        title: '¿Estás seguro que deseas editar esta compra a realizar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16A34A',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.compraRealizarService.updateData(body).subscribe({
              next: (response: any) => {
                Swal.fire(
                  '¡Editado!',
                  'La compra a realizar se ha editado correctamente.',
                  'success'
                );

                setTimeout(() => {
                  this.router
                    .navigate(['/admin/compras/listado-de-compras-por-hacer'])
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
                  'Ha ocurrido un error al intentar editar la compra a realizar. Por favor, inténtelo de nuevo más tarde.',
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
        this.compraRealizarService.getDataById(id).subscribe(
          (compraRealizar: any) => {
            // Convertir la fecha al formato YYYY-MM-DD
            const fecha = new Date(compraRealizar.resultado.fecha);
            const fechaFormateada = fecha.toISOString().split('T')[0];
            // Asignar la fecha formateada al formulario
            const formData = {
              ...compraRealizar.resultado,
              fecha: fechaFormateada,
            };
            this.frmAddEditCompraRealizar.patchValue(formData);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // FUNCION PARA CARGAR EL COMBO DE PRODUCTOS
  cargarCmbProcuctos() {
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

  // FUNCION PARA CARGAR EL COMBO DE PRIORIDADES
  cargarCmbPrioridad() {
    this.prioridadesService.getAllData().subscribe(
      (data: any) => {
        const prioridades = data.resultado;

        this.prioridades = prioridades;
      },
      (error) => {
        console.log('Error al obtener los prioridades', error);
      }
    );
  }

  // REDIRECCIONAR A AGREGAR PRODUCTO
  redireccionarAgregarProducto() {
    this.router.navigate(['/admin/productos/nuevo-producto']);
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlProductos(): FormControl {
    return this.frmAddEditCompraRealizar.controls['idProducto'] as FormControl;
  }
  get controlCantidad(): FormControl {
    return this.frmAddEditCompraRealizar.controls['cantidad'] as FormControl;
  }
  get controlFecha(): FormControl {
    return this.frmAddEditCompraRealizar.controls['fecha'] as FormControl;
  }
  get controlPrioridad(): FormControl {
    return this.frmAddEditCompraRealizar.controls['idPrioridad'] as FormControl;
  }
}
