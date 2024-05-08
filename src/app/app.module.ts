import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ListadoProductosComponent } from './panel/productos/listado-productos/listado-productos.component';
import { NuevoProductoComponent } from './panel/productos/nuevo-producto/nuevo-producto.component';
import { PanelRightComponent } from './components/panel-right/panel-right.component';
import { NuevoClienteComponent } from './panel/clientes/mascotas/nuevo-cliente/nuevo-cliente.component';
import { ListadoClientesComponent } from './panel/clientes/mascotas/listado-clientes/listado-clientes.component';
import { NuevoEmpleadoComponent } from './panel/empleados/nuevo-empleado/nuevo-empleado.component';
import { ListadoEmpleadosComponent } from './panel/empleados/listado-empleados/listado-empleados.component';
import { NuevoProveedorComponent } from './panel/proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { ListadoProveedoresComponent } from './panel/proveedores/listado-proveedores/listado-proveedores.component';
import { ListadoComprasPorHacerComponent } from './panel/compras/compras-a-realizar/listado-compras-por-hacer/listado-compras-por-hacer.component';
import { ListadoComprasComponent } from './panel/compras/compras-general/listado-compras/listado-compras.component';
import { NuevaCompraComponent } from './panel/compras/compras-general/nueva-compra/nueva-compra.component';
import { NuevaCompraRealizarComponent } from './panel/compras/compras-a-realizar/nueva-compra-realizar/nueva-compra-realizar.component';
import { NuevaVentaComponent } from './panel/ventas/nueva-venta/nueva-venta.component';
import { ListadoVentasComponent } from './panel/ventas/listado-ventas/listado-ventas.component';
import { MisVentasComponent } from './panel/ventas/mis-ventas/mis-ventas.component';

import { DropdownModule } from 'primeng/dropdown';
import { CajaComponent } from './panel/caja/caja.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearRecordatorioComponent } from './panel/recordatorios/crear-recordatorio/crear-recordatorio.component';
import { ListadoRecordatoriosHoyComponent } from './panel/recordatorios/listado-recordatorios-hoy/listado-recordatorios-hoy.component';
import { ListadoRecordatorioGeneralComponent } from './panel/recordatorios/listado-recordatorio-general/listado-recordatorio-general.component';
import { NuevaInternacionComponent } from './panel/clientes/internaciones/nueva-internacion/nueva-internacion.component';
import { AgregarHonorarioComponent } from './panel/honorarios/agregar-honorario/agregar-honorario.component';
import { ListadoHonorariosComponent } from './panel/honorarios/listado-honorarios/listado-honorarios.component';
import { RecuperarContraseniaComponent } from './auth/recuperar-contrasenia/recuperar-contrasenia.component';
import { ListadoDeInternacionesComponent } from './panel/clientes/internaciones/listado-de-internaciones/listado-de-internaciones.component';
import { VerDetalleInternacionComponent } from './panel/clientes/internaciones/ver-detalle-internacion/ver-detalle-internacion.component';
import { ToolbarModule } from 'primeng/toolbar';
import { VerDetalleClienteComponent } from './panel/clientes/mascotas/ver-detalle-cliente/ver-detalle-cliente.component';
import { VerDetalleProductoComponent } from './panel/productos/ver-detalle-producto/ver-detalle-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NuevaRazaComponent } from './panel/razas/nueva-raza/nueva-raza.component';

import { ListadoRazasComponent } from './panel/razas/listado-razas/listado-razas.component';
import { NuevaMarcaComponent } from './panel/marcas/nueva-marca/nueva-marca.component';
import { ListadoMarcasComponent } from './panel/marcas/listado-marcas/listado-marcas.component';
import { ListadoGalenoComponent } from './panel/galenos/listado-galeno/listado-galeno.component';
import { EditarGalenoComponent } from './panel/galenos/editar-galeno/editar-galeno.component';

import { CambioDeColorPipe } from './pipes/cambioDeColor/cambio-de-color.pipe';
import { ListadoPersonasComponent } from './panel/personas/listado-personas/listado-personas.component';
import { EditarPersonaComponent } from './panel/personas/editar-persona/editar-persona.component';
import { BooleanColorPipe } from './pipes/booleanColor/boolean-color.pipe';
import { NuevoHistorialClinicoComponent } from './panel/clientes/historial-clinico/nuevo-historial-clinico/nuevo-historial-clinico.component';
import { HistorialesClinicosComponent } from './panel/clientes/historial-clinico/historiales-clinicos/historiales-clinicos.component';
import { TruncateTextPipe } from './pipes/truncateText/truncate-text.pipe';
import { EliminarInternacionComponent } from './panel/clientes/internaciones/eliminar-internacion/eliminar-internacion.component';
import { EliminarHistorialClinicoComponent } from './panel/clientes/historial-clinico/eliminar-historial-clinico/eliminar-historial-clinico.component';
import { PrioridadColorPipe } from './pipes/prioridadColor/prioridad-color.pipe';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { DetalleHistorialClinicoComponent } from './panel/clientes/historial-clinico/detalle-historial-clinico/detalle-historial-clinico.component';
import { EliminarElementoComponent } from './components/eliminar-elemento/eliminar-elemento.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    ListadoProductosComponent,
    NuevoProductoComponent,
    PanelRightComponent,
    NuevoClienteComponent,
    ListadoClientesComponent,
    NuevoEmpleadoComponent,
    ListadoEmpleadosComponent,
    NuevoProveedorComponent,
    ListadoProveedoresComponent,
    ListadoComprasPorHacerComponent,
    ListadoComprasComponent,
    NuevaCompraComponent,
    NuevaCompraRealizarComponent,
    NuevaVentaComponent,
    ListadoVentasComponent,
    MisVentasComponent,

    CajaComponent,

    CrearRecordatorioComponent,
    ListadoRecordatoriosHoyComponent,
    ListadoRecordatorioGeneralComponent,
    NuevaInternacionComponent,
    AgregarHonorarioComponent,
    ListadoHonorariosComponent,
    RecuperarContraseniaComponent,
    ListadoDeInternacionesComponent,
    VerDetalleInternacionComponent,
    VerDetalleClienteComponent,
    VerDetalleProductoComponent,
    NuevaRazaComponent,

    ListadoRazasComponent,
    NuevaMarcaComponent,
    ListadoMarcasComponent,
    ListadoGalenoComponent,
    EditarGalenoComponent,

    CambioDeColorPipe,
    ListadoPersonasComponent,
    EditarPersonaComponent,

    BooleanColorPipe,
    NuevoHistorialClinicoComponent,
    HistorialesClinicosComponent,
    TruncateTextPipe,
    EliminarInternacionComponent,
    EliminarHistorialClinicoComponent,
    PrioridadColorPipe,

    ConfiguracionComponent,
    DetalleHistorialClinicoComponent,
    EliminarElementoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarModule,
    HttpClientModule,
    // Toastr
    BrowserAnimationsModule, // required animations module

    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      // progressBar: true,
    }), // ToastrModule added
    DropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
