import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarElementoComponent } from './eliminar-elemento.component';

describe('EliminarElementoComponent', () => {
  let component: EliminarElementoComponent;
  let fixture: ComponentFixture<EliminarElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarElementoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
