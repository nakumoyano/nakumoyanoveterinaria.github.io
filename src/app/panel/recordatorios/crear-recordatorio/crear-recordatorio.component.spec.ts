import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecordatorioComponent } from './crear-recordatorio.component';

describe('CrearRecordatorioComponent', () => {
  let component: CrearRecordatorioComponent;
  let fixture: ComponentFixture<CrearRecordatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRecordatorioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
