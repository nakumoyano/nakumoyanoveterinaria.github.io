import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleInternacionComponent } from './ver-detalle-internacion.component';

describe('VerDetalleInternacionComponent', () => {
  let component: VerDetalleInternacionComponent;
  let fixture: ComponentFixture<VerDetalleInternacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleInternacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleInternacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
