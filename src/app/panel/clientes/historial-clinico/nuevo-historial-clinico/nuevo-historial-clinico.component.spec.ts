import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoHistorialClinicoComponent } from './nuevo-historial-clinico.component';

describe('NuevoHistorialClinicoComponent', () => {
  let component: NuevoHistorialClinicoComponent;
  let fixture: ComponentFixture<NuevoHistorialClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoHistorialClinicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoHistorialClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
