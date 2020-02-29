import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarTareaComponent } from './configurar-tarea.component';

describe('ConfigurarTareaComponent', () => {
  let component: ConfigurarTareaComponent;
  let fixture: ComponentFixture<ConfigurarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
