import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComprasPorHacerComponent } from './listado-compras-por-hacer.component';

describe('ListadoComprasPorHacerComponent', () => {
  let component: ListadoComprasPorHacerComponent;
  let fixture: ComponentFixture<ListadoComprasPorHacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoComprasPorHacerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoComprasPorHacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
