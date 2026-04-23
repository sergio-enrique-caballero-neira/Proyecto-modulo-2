import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMenuPrincipal } from './usuarios-menu-principal';

describe('UsuariosMenuPrincipal', () => {
  let component: UsuariosMenuPrincipal;
  let fixture: ComponentFixture<UsuariosMenuPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosMenuPrincipal],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosMenuPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
