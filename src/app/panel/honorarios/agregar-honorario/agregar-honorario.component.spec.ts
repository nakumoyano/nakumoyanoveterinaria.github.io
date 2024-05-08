import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHonorarioComponent } from './agregar-honorario.component';

describe('AgregarHonorarioComponent', () => {
  let component: AgregarHonorarioComponent;
  let fixture: ComponentFixture<AgregarHonorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHonorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHonorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
