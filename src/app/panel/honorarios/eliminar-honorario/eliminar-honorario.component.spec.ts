import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarHonorarioComponent } from './eliminar-honorario.component';

describe('EliminarHonorarioComponent', () => {
  let component: EliminarHonorarioComponent;
  let fixture: ComponentFixture<EliminarHonorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarHonorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarHonorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
