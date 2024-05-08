import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Mascota } from 'src/app/models/mascota/mascota';
import { EspeciesService } from 'src/app/services/especies/especies.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { RazasService } from 'src/app/services/razas/razas.service';
import { SexosService } from 'src/app/services/sexos/sexos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
})
export class ListadoClientesComponent implements OnInit, AfterViewInit {
  @Input() mascotas: Mascota[];

  constructor(
    private razasService: RazasService,
    private sexosService: SexosService,
    private especiesService: EspeciesService,
    private personasService: PersonasService,
    private mascotasService: MascotasService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getAllDatos();
  }

  //  OBTENER DATOS
  getAllDatos() {
    forkJoin([
      this.razasService.getAllData(),
      this.sexosService.getAllData(),
      this.especiesService.getAllEspecies(),
      this.personasService.getAllData(),
      this.mascotasService.getAllData(),
    ]).subscribe(
      ([
        dataRazas,
        dataSexos,
        dataEspecies,
        dataPersonas,
        dataMascotas,
      ]: any) => {
        const razas = dataRazas.resultado;
        const sexos = dataSexos.resultado;
        const especies = dataEspecies.resultado;
        const personas = dataPersonas.resultado;
        const mascotas = dataMascotas.resultado;

        mascotas.forEach((mascota: any) => {
          mascota.raza = razas.find(
            (raza: any) => raza.idRaza === mascota.idRaza
          );
          mascota.sexo = sexos.find(
            (sexo: any) => sexo.idSexo === mascota.idSexo
          );
          mascota.especie = especies.find(
            (especie: any) => especie.idEspecie === mascota.idEspecie
          );
          mascota.persona = personas.find(
            (persona: any) => persona.idPersona === mascota.idPersona
          );
        });

        this.mascotas = mascotas;
        console.log(this.mascotas);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  // RECARGAR PAGINA AL IR EDITAR PARA QUE NO SE BUGUEE LOS DROPDOWN
  recargar() {
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS
  obtenerTotalResultados(): number {
    return this.mascotas?.length;
  }

  // FUNCION PARA ELIMINAR
  eliminar(mascota: any) {
    this.mascotasService.deleteData(mascota).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡La mascota se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        // Manejar el error al eliminar el producto
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar la mascota.'
        );
      },
    });
  }

  // FUNCION PARA CALUCLAR LA EDAD A PARTIR DE LA FECHA DE NACIMIENTO
  calcularEdad(fechaNacimiento: Date): any {
    if (!fechaNacimiento) return null;

    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoy.getDate() < cumpleanos.getDate()) ||
      (mes === 0 && hoy.getDate() === cumpleanos.getDate())
    ) {
      edad--;
    }

    // Si la mascota tiene menos de un año, y su año de nacimiento es el año actual o el anterior,
    // entonces su edad será de 1 año
    if (
      edad < 1 &&
      (cumpleanos.getFullYear() === hoy.getFullYear() ||
        cumpleanos.getFullYear() === hoy.getFullYear() - 1)
    ) {
      edad = 1;
    }

    return edad;
  }
}
