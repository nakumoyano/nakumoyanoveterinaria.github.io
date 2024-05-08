import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeInternacionesComponent } from './listado-de-internaciones.component';

describe('ListadoDeInternacionesComponent', () => {
  let component: ListadoDeInternacionesComponent;
  let fixture: ComponentFixture<ListadoDeInternacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDeInternacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDeInternacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
