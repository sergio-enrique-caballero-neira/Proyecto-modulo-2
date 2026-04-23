import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMenuPaquetesNoAlimenticios } from './usuarios-menu-paquetes-no-alimenticios';

describe('UsuariosMenuPaquetesNoAlimenticios', () => {
  let component: UsuariosMenuPaquetesNoAlimenticios;
  let fixture: ComponentFixture<UsuariosMenuPaquetesNoAlimenticios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosMenuPaquetesNoAlimenticios],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosMenuPaquetesNoAlimenticios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
