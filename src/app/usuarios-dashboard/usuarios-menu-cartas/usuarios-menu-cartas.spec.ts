import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMenuCartas } from './usuarios-menu-cartas';

describe('UsuariosMenuCartas', () => {
  let component: UsuariosMenuCartas;
  let fixture: ComponentFixture<UsuariosMenuCartas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosMenuCartas],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosMenuCartas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
