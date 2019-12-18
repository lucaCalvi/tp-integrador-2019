import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTareasCreadasComponent } from './listado-tareas-creadas.component';

describe('ListadoTareasCreadasComponent', () => {
  let component: ListadoTareasCreadasComponent;
  let fixture: ComponentFixture<ListadoTareasCreadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTareasCreadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTareasCreadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
