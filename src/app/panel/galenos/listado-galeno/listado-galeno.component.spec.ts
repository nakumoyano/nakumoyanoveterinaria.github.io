import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGalenoComponent } from './listado-galeno.component';

describe('ListadoGalenoComponent', () => {
  let component: ListadoGalenoComponent;
  let fixture: ComponentFixture<ListadoGalenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGalenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoGalenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
