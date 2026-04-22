import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuManipulador } from './admin-menu-manipulador';

describe('AdminMenuManipulador', () => {
  let component: AdminMenuManipulador;
  let fixture: ComponentFixture<AdminMenuManipulador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuManipulador],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuManipulador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
