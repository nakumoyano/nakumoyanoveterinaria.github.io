import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCompraRealizarComponent } from './nueva-compra-realizar.component';

describe('NuevaCompraRealizarComponent', () => {
  let component: NuevaCompraRealizarComponent;
  let fixture: ComponentFixture<NuevaCompraRealizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaCompraRealizarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCompraRealizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
