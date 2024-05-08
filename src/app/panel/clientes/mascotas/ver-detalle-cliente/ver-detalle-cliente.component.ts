import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/models/mascota/mascota';
import { EspeciesService } from 'src/app/services/especies/especies.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { RazasService } from 'src/app/services/razas/razas.service';
import { SexosService } from 'src/app/services/sexos/sexos.service';

@Component({
  selector: 'app-ver-detalle-cliente',
  templateUrl: './ver-detalle-cliente.component.html',
  styleUrls: ['./ver-detalle-cliente.component.css'],
})
export class VerDetalleClienteComponent implements OnInit {
  @Input() mascotas: Mascota[];

  constructor(
    private razasService: RazasService,
    private sexosService: SexosService,
    private especiesService: EspeciesService,
    private personasService: PersonasService,
    private mascotasService: MascotasService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id']; // '+' para convertir el string a número
      if (id) {
        this.getAllDatos(id);
      }
    });
  }

  getAllDatos(id: number) {
    let razas: any[];
    let sexos: any[];
    let especies: any[];
    let personas: any[];

    this.razasService.getAllData().subscribe((dataRazas: any) => {
      razas = dataRazas.resultado;
      this.sexosService.getAllData().subscribe((dataSexos: any) => {
        sexos = dataSexos.resultado;
        this.especiesService.getAllEspecies().subscribe((dataEspecies: any) => {
          especies = dataEspecies.resultado;
          this.personasService.getAllData().subscribe((dataPersonas: any) => {
            personas = dataPersonas.resultado;

            this.mascotasService.getDataById(id).subscribe(
              (dataMascota: any) => {
                const mascota = dataMascota.resultado;

                const razasPerteneciente = razas.find(
                  (raza: any) => raza.idRaza === mascota.idRaza
                );
                const sexosPerteneciente = sexos.find(
                  (sexo: any) => sexo.idSexo === mascota.idSexo
                );
                const especiesPerteneciente = especies.find(
                  (especie: any) => especie.idEspecie === mascota.idEspecie
                );
                const personasPerteneciente = personas.find(
                  (persona: any) => persona.idPersona === mascota.idPersona
                );

                if (razasPerteneciente) {
                  mascota.raza = razasPerteneciente;
                }
                if (sexosPerteneciente) {
                  mascota.sexo = sexosPerteneciente;
                }
                if (especiesPerteneciente) {
                  mascota.especie = especiesPerteneciente;
                }
                if (personasPerteneciente) {
                  mascota.persona = personasPerteneciente;
                }

                this.mascotas = [mascota];
                console.log(this.mascotas);
              },
              (errorMascota) => {
                console.error('Error al obtener la mascota:', errorMascota);
              }
            );
          });
        });
      });
    });
  }

  // RECARGAR PAGINA AL IR EDITAR PARA QUE NO SE BUGUEE LOS DROPDOWN
  recargar() {
    setTimeout(() => {
      location.reload();
    }, 100);
  }
}
