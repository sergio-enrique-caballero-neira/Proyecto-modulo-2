import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDashboard } from './usuarios-dashboard';

describe('UsuariosDashboard', () => {
  let component: UsuariosDashboard;
  let fixture: ComponentFixture<UsuariosDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
