import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaMarcaComponent } from './nueva-marca.component';

describe('NuevaMarcaComponent', () => {
  let component: NuevaMarcaComponent;
  let fixture: ComponentFixture<NuevaMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaMarcaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
