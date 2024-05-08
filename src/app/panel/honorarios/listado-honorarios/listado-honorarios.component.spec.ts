import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoHonorariosComponent } from './listado-honorarios.component';

describe('ListadoHonorariosComponent', () => {
  let component: ListadoHonorariosComponent;
  let fixture: ComponentFixture<ListadoHonorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoHonorariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoHonorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
