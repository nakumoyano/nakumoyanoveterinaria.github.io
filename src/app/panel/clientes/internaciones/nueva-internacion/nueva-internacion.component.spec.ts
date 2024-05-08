import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaInternacionComponent } from './nueva-internacion.component';

describe('NuevaInternacionComponent', () => {
  let component: NuevaInternacionComponent;
  let fixture: ComponentFixture<NuevaInternacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaInternacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaInternacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
