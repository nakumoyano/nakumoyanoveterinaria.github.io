import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleClienteComponent } from './ver-detalle-cliente.component';

describe('VerDetalleClienteComponent', () => {
  let component: VerDetalleClienteComponent;
  let fixture: ComponentFixture<VerDetalleClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
