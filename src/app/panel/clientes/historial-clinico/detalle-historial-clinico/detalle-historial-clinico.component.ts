import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HistoriaClinica } from 'src/app/models/historia-clinica/historia-clinica';
import { Internacion } from 'src/app/models/internacion/internacion';
import { Mascota } from 'src/app/models/mascota/mascota';
import { Persona } from 'src/app/models/persona/persona';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas/historias-clinicas.service';
import { InternacionesService } from 'src/app/services/internaciones/internaciones.service';
import { MascotasService } from 'src/app/services/mascotas/mascotas.service';
import { PersonasService } from 'src/app/services/personas/personas.service';

@Component({
  selector: 'app-detalle-historial-clinico',
  templateUrl: './detalle-historial-clinico.component.html',
  styleUrls: ['./detalle-historial-clinico.component.css'],
})
export class DetalleHistorialClinicoComponent implements OnInit {
  // @Input() internaciones: Internacion[];
  @Input() historias: HistoriaClinica[];

  constructor(
    private mascotasService: MascotasService,
    private internacionesService: InternacionesService,
    private activatedRoute: ActivatedRoute,
    private personasService: PersonasService,
    private historialClinicoService: HistoriasClinicasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.getAllDatos(id);
      }
    });
  }
  // FUNCION PARA TREAR DATOS
  internaciones: Internacion[] = [];
  getAllDatos(id: number): void {
    let mascotas: Mascota[];
    let personas: Persona[];

    forkJoin([
      this.mascotasService.getAllData(),
      this.personasService.getAllData(),
      this.historialClinicoService.getDataById(id),
    ]).subscribe(
      ([dataMascotas, dataPersonas, dataHistoria]: any) => {
        mascotas = dataMascotas.resultado;
        personas = dataPersonas.resultado;
        const historia: HistoriaClinica = dataHistoria.resultado;

        const mascotaPerteneciente = mascotas.find(
          (mascota: Mascota) => mascota.idMascota === historia.idMascota
        );

        if (mascotaPerteneciente) {
          historia.mascota = mascotaPerteneciente;

          const personaPropietaria = personas.find(
            (persona: Persona) =>
              persona.idPersona === historia.mascota?.idPersona
          );

          if (personaPropietaria) {
            historia.mascota.persona = personaPropietaria;
          } else {
            console.error(
              'No se encontró la persona propietaria de la mascota'
            );
          }

          // Obtener las internaciones de la mascota
          const idMascota = historia.idMascota;
          this.getInternacionesByIdMascota(idMascota);
        }

        this.historias = [historia];
        console.log(this.historias);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  getInternacionesByIdMascota(idMascota: number): void {
    this.internacionesService
      .getDataInternacionByIdMascota(idMascota)
      .subscribe(
        (dataInternaciones: any) => {
          this.internaciones = dataInternaciones.resultado;
          console.log(this.internaciones);
        },
        (errorInternaciones) => {
          console.error(
            'Error al obtener las internaciones:',
            errorInternaciones
          );
        }
      );
  }
}
