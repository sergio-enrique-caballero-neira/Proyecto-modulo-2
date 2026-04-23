import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMenuPaquetesAlimenticios } from './usuarios-menu-paquetes-alimenticios';

describe('UsuariosMenuPaquetesAlimenticios', () => {
  let component: UsuariosMenuPaquetesAlimenticios;
  let fixture: ComponentFixture<UsuariosMenuPaquetesAlimenticios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosMenuPaquetesAlimenticios],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosMenuPaquetesAlimenticios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
