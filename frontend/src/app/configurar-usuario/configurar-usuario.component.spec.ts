import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarUsuarioComponent } from './configurar-usuario.component';

describe('ConfigurarUsuarioComponent', () => {
  let component: ConfigurarUsuarioComponent;
  let fixture: ComponentFixture<ConfigurarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
