import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMarcasComponent } from './listado-marcas.component';

describe('ListadoMarcasComponent', () => {
  let component: ListadoMarcasComponent;
  let fixture: ComponentFixture<ListadoMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMarcasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
