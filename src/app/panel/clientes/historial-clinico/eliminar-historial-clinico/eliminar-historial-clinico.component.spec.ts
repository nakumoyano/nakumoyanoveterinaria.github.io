import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarHistorialClinicoComponent } from './eliminar-historial-clinico.component';

describe('EliminarHistorialClinicoComponent', () => {
  let component: EliminarHistorialClinicoComponent;
  let fixture: ComponentFixture<EliminarHistorialClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarHistorialClinicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarHistorialClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
