import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGalenoComponent } from './editar-galeno.component';

describe('EditarGalenoComponent', () => {
  let component: EditarGalenoComponent;
  let fixture: ComponentFixture<EditarGalenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGalenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGalenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
