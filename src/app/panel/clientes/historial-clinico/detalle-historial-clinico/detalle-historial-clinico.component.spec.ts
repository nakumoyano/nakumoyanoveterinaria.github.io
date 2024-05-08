import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleHistorialClinicoComponent } from './detalle-historial-clinico.component';

describe('DetalleHistorialClinicoComponent', () => {
  let component: DetalleHistorialClinicoComponent;
  let fixture: ComponentFixture<DetalleHistorialClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleHistorialClinicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleHistorialClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
