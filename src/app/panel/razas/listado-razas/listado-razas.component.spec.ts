import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRazasComponent } from './listado-razas.component';

describe('ListadoRazasComponent', () => {
  let component: ListadoRazasComponent;
  let fixture: ComponentFixture<ListadoRazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoRazasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoRazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
