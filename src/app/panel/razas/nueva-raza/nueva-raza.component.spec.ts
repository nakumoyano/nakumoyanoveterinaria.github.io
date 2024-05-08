import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaRazaComponent } from './nueva-raza.component';

describe('NuevaRazaComponent', () => {
  let component: NuevaRazaComponent;
  let fixture: ComponentFixture<NuevaRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaRazaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
