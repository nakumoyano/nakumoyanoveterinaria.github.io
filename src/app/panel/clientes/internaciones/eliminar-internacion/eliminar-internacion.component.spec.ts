import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInternacionComponent } from './eliminar-internacion.component';

describe('EliminarInternacionComponent', () => {
  let component: EliminarInternacionComponent;
  let fixture: ComponentFixture<EliminarInternacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarInternacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarInternacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
