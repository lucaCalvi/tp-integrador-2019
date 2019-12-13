import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTareasAsignadasComponent } from './listado-tareas-asignadas.component';

describe('ListadoTareasAsignadasComponent', () => {
  let component: ListadoTareasAsignadasComponent;
  let fixture: ComponentFixture<ListadoTareasAsignadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTareasAsignadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTareasAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
