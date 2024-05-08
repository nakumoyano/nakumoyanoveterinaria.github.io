import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleProductoComponent } from './ver-detalle-producto.component';

describe('VerDetalleProductoComponent', () => {
  let component: VerDetalleProductoComponent;
  let fixture: ComponentFixture<VerDetalleProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
