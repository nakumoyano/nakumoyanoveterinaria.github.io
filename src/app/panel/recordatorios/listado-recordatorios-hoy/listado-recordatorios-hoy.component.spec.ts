import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRecordatoriosHoyComponent } from './listado-recordatorios-hoy.component';

describe('ListadoRecordatoriosHoyComponent', () => {
  let component: ListadoRecordatoriosHoyComponent;
  let fixture: ComponentFixture<ListadoRecordatoriosHoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoRecordatoriosHoyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoRecordatoriosHoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
