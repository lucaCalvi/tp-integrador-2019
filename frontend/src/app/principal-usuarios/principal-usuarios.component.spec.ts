import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalUsuariosComponent } from './principal-usuarios.component';

describe('PrincipalUsuariosComponent', () => {
  let component: PrincipalUsuariosComponent;
  let fixture: ComponentFixture<PrincipalUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
