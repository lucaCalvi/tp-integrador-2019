import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTareaComponent } from './asignar-tarea.component';

describe('AsignarTareaComponent', () => {
  let component: AsignarTareaComponent;
  let fixture: ComponentFixture<AsignarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
