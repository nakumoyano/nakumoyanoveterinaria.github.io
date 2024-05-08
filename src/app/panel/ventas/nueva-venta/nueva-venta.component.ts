import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModoPago } from 'src/app/models/modo-pago/modo-pago';
import { Producto } from 'src/app/models/producto/producto';
import { ModoPagosService } from 'src/app/services/modo-pagos/modo-pagos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css'],
})
export class NuevaVentaComponent implements OnInit {
  @Input() productos: Producto[];
  @Input() modoPagos: ModoPago[];

  frmAddEditVenta: FormGroup;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedProducto: string;
  selectedModoPago: string;

  constructor(
    private productoService: ProductosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modoPagoService: ModoPagosService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.cargarCmbProcuctos();
    this.cargarCmbModoPagos();
  }

  // FUNCION PARA INICLIZAR CAMPOS FORMULARIO
  createForm() {
    this.frmAddEditVenta = this.formBuilder.group({
      idProducto: [''],
      idModoPago: ['', Validators.required],
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

  // FUNCION PARA CARGAR EL COMBO DE MODOS DE PAGOS
  cargarCmbModoPagos() {
    this.modoPagoService.getAllModosPagos().subscribe(
      (data: any) => {
        const modoPagos = data.resultado;

        this.modoPagos = modoPagos;
      },
      (error) => {
        console.log('Error al obtener los modoPagos', error);
      }
    );
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlProductos(): FormControl {
    return this.frmAddEditVenta.controls['idProducto'] as FormControl;
  }
  get controlModoPago(): FormControl {
    return this.frmAddEditVenta.controls['idModoPago'] as FormControl;
  }
}
