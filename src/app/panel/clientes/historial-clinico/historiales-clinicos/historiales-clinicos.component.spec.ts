import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialesClinicosComponent } from './historiales-clinicos.component';

describe('HistorialesClinicosComponent', () => {
  let component: HistorialesClinicosComponent;
  let fixture: ComponentFixture<HistorialesClinicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialesClinicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialesClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
