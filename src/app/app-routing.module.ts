import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ListadoProductosComponent } from './panel/productos/listado-productos/listado-productos.component';
import { NuevoProductoComponent } from './panel/productos/nuevo-producto/nuevo-producto.component';
import { NuevoClienteComponent } from './panel/clientes/mascotas/nuevo-cliente/nuevo-cliente.component';
import { ListadoClientesComponent } from './panel/clientes/mascotas/listado-clientes/listado-clientes.component';
import { ListadoEmpleadosComponent } from './panel/empleados/listado-empleados/listado-empleados.component';
import { NuevoEmpleadoComponent } from './panel/empleados/nuevo-empleado/nuevo-empleado.component';
import { ListadoProveedoresComponent } from './panel/proveedores/listado-proveedores/listado-proveedores.component';
import { NuevoProveedorComponent } from './panel/proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { ListadoComprasPorHacerComponent } from './panel/compras/compras-a-realizar/listado-compras-por-hacer/listado-compras-por-hacer.component';
import { ListadoComprasComponent } from './panel/compras/compras-general/listado-compras/listado-compras.component';
import { NuevaCompraComponent } from './panel/compras/compras-general/nueva-compra/nueva-compra.component';
import { NuevaCompraRealizarComponent } from './panel/compras/compras-a-realizar/nueva-compra-realizar/nueva-compra-realizar.component';
import { NuevaVentaComponent } from './panel/ventas/nueva-venta/nueva-venta.component';
import { ListadoVentasComponent } from './panel/ventas/listado-ventas/listado-ventas.component';
import { MisVentasComponent } from './panel/ventas/mis-ventas/mis-ventas.component';

import { CajaComponent } from './panel/caja/caja.component';
import { CrearRecordatorioComponent } from './panel/recordatorios/crear-recordatorio/crear-recordatorio.component';
import { ListadoRecordatoriosHoyComponent } from './panel/recordatorios/listado-recordatorios-hoy/listado-recordatorios-hoy.component';
import { ListadoRecordatorioGeneralComponent } from './panel/recordatorios/listado-recordatorio-general/listado-recordatorio-general.component';
import { NuevaInternacionComponent } from './panel/clientes/internaciones/nueva-internacion/nueva-internacion.component';
import { AgregarHonorarioComponent } from './panel/honorarios/agregar-honorario/agregar-honorario.component';
import { ListadoHonorariosComponent } from './panel/honorarios/listado-honorarios/listado-honorarios.component';
import { RecuperarContraseniaComponent } from './auth/recuperar-contrasenia/recuperar-contrasenia.component';
import { ListadoDeInternacionesComponent } from './panel/clientes/internaciones/listado-de-internaciones/listado-de-internaciones.component';
import { VerDetalleInternacionComponent } from './panel/clientes/internaciones/ver-detalle-internacion/ver-detalle-internacion.component';
import { VerDetalleClienteComponent } from './panel/clientes/mascotas/ver-detalle-cliente/ver-detalle-cliente.component';
import { NuevaRazaComponent } from './panel/razas/nueva-raza/nueva-raza.component';
import { ListadoRazasComponent } from './panel/razas/listado-razas/listado-razas.component';
import { NuevaMarcaComponent } from './panel/marcas/nueva-marca/nueva-marca.component';
import { ListadoMarcasComponent } from './panel/marcas/listado-marcas/listado-marcas.component';
import { EditarGalenoComponent } from './panel/galenos/editar-galeno/editar-galeno.component';
import { ListadoGalenoComponent } from './panel/galenos/listado-galeno/listado-galeno.component';
import { ListadoPersonasComponent } from './panel/personas/listado-personas/listado-personas.component';
import { EditarPersonaComponent } from './panel/personas/editar-persona/editar-persona.component';
import { NuevoHistorialClinicoComponent } from './panel/clientes/historial-clinico/nuevo-historial-clinico/nuevo-historial-clinico.component';
import { HistorialesClinicosComponent } from './panel/clientes/historial-clinico/historiales-clinicos/historiales-clinicos.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { DetalleHistorialClinicoComponent } from './panel/clientes/historial-clinico/detalle-historial-clinico/detalle-historial-clinico.component';

const routes: Routes = [
  // F*********************************************** PAGES
  { path: '', component: LoginComponent },

  { path: 'recuperar-contraseña', component: RecuperarContraseniaComponent },
  { path: 'configuracion', component: ConfiguracionComponent },

  // F*********************************************** PANEL

  //  d********************************** login
  { path: 'admin/login', component: LoginComponent },

  { path: 'admin/dashboard', component: DashboardComponent },

  //  d********************************** productos
  {
    path: 'admin/productos/listado-de-productos',
    component: ListadoProductosComponent,
  },
  {
    path: 'admin/productos/nuevo-producto',
    component: NuevoProductoComponent,
  },
  {
    path: 'admin/productos/editar-producto/:id',
    component: NuevoProductoComponent,
  },
  // d**********************************  clientes/mascotas
  {
    path: 'admin/mascotas/listado-de-mascotas',
    component: ListadoClientesComponent,
  },
  {
    path: 'admin/mascotas/nueva-mascota',
    component: NuevoClienteComponent,
  },
  {
    path: 'admin/mascotas/editar-mascota/:id',
    component: NuevoClienteComponent,
  },
  {
    path: 'admin/mascotas/nueva-internacion',
    component: NuevaInternacionComponent,
  },
  {
    path: 'admin/mascotas/editar-internacion/:id',
    component: NuevaInternacionComponent,
  },
  {
    path: 'admin/mascotas/listado-de-internaciones',
    component: ListadoDeInternacionesComponent,
  },
  {
    path: 'admin/mascotas/detalle-de-internacion/:id',
    component: VerDetalleInternacionComponent,
  },
  {
    path: 'admin/mascotas/detalle-de-mascota/:id',
    component: VerDetalleClienteComponent,
  },
  {
    path: 'admin/mascotas/nuevo-historial-clinico',
    component: NuevoHistorialClinicoComponent,
  },
  {
    path: 'admin/mascotas/editar-historial-clinico/:id',
    component: NuevoHistorialClinicoComponent,
  },
  {
    path: 'admin/mascotas/historiales-clinicos',
    component: HistorialesClinicosComponent,
  },
  {
    path: 'admin/mascotas/detalle-historial-clinico/:id',
    component: DetalleHistorialClinicoComponent,
  },
  // d**********************************  personas
  {
    path: 'admin/duenios/listado-de-duenios',
    component: ListadoPersonasComponent,
  },
  {
    path: 'admin/duenios/editar-duenio/:id',
    component: EditarPersonaComponent,
  },
  // d**********************************  proveedores
  {
    path: 'admin/proveedores/listado-de-proveedores',
    component: ListadoProveedoresComponent,
  },
  {
    path: 'admin/proveedores/nuevo-proveedor',
    component: NuevoProveedorComponent,
  },
  {
    path: 'admin/proveedores/editar-proveedor/:id',
    component: NuevoProveedorComponent,
  },
  // d**********************************  marcas
  {
    path: 'admin/marcas/listado-de-marcas',
    component: ListadoMarcasComponent,
  },
  {
    path: 'admin/marcas/nueva-marca',
    component: NuevaMarcaComponent,
  },
  {
    path: 'admin/marcas/editar-marca/:id',
    component: NuevaMarcaComponent,
  },
  // d**********************************  razas
  {
    path: 'admin/razas/listado-de-razas',
    component: ListadoRazasComponent,
  },
  {
    path: 'admin/razas/nueva-raza',
    component: NuevaRazaComponent,
  },
  {
    path: 'admin/razas/editar-raza/:id',
    component: NuevaRazaComponent,
  },
  // d**********************************  recordatorios
  {
    path: 'admin/recordatorios/crear-recordatorio',
    component: CrearRecordatorioComponent,
  },
  {
    path: 'admin/recordatorios/editar-recordatorio/:id',
    component: CrearRecordatorioComponent,
  },
  {
    path: 'admin/recordatorios/listado-de-recordatorios-del-dia',
    component: ListadoRecordatoriosHoyComponent,
  },
  {
    path: 'admin/recordatorios/listado-de-recordatorios-general',
    component: ListadoRecordatorioGeneralComponent,
  },
  // d********************************** compras
  {
    path: 'admin/compras/listado-de-compras-por-hacer',
    component: ListadoComprasPorHacerComponent,
  },
  {
    path: 'admin/compras/listado-de-compras',
    component: ListadoComprasComponent,
  },
  {
    path: 'admin/compras/nueva-compra',
    component: NuevaCompraComponent,
  },
  {
    path: 'admin/compras/nueva-comprar-a-realizar',
    component: NuevaCompraRealizarComponent,
  },
  {
    path: 'admin/compras/editar-comprar-a-realizar/:id',
    component: NuevaCompraRealizarComponent,
  },
  // d**********************************  ventas
  {
    path: 'admin/ventas/listado-de-ventas',
    component: ListadoVentasComponent,
  },
  {
    path: 'admin/ventas/mis-ventas',
    component: MisVentasComponent,
  },
  {
    path: 'admin/ventas/nueva-venta',
    component: NuevaVentaComponent,
  },
  // d**********************************  caja
  {
    path: 'admin/caja',
    component: CajaComponent,
  },
  // d**********************************  HONORAROS
  {
    path: 'admin/honorarios/agregar-honorario',
    component: AgregarHonorarioComponent,
  },
  {
    path: 'admin/honorarios/editar-honorario/:id',
    component: AgregarHonorarioComponent,
  },
  {
    path: 'admin/honorarios/listado-de-honorarios',
    component: ListadoHonorariosComponent,
  },
  // d**********************************  GALENOS
  {
    path: 'admin/galenos/editar-galeno/:id',
    component: EditarGalenoComponent,
  },
  {
    path: 'admin/galenos/listado-galenos',
    component: ListadoGalenoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
