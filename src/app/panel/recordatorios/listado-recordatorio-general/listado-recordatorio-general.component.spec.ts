import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRecordatorioGeneralComponent } from './listado-recordatorio-general.component';

describe('ListadoRecordatorioGeneralComponent', () => {
  let component: ListadoRecordatorioGeneralComponent;
  let fixture: ComponentFixture<ListadoRecordatorioGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoRecordatorioGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoRecordatorioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
