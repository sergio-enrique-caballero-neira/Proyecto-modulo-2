import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuUsuarioNormal } from './admin-menu-usuario-normal';

describe('AdminMenuUsuarioNormal', () => {
  let component: AdminMenuUsuarioNormal;
  let fixture: ComponentFixture<AdminMenuUsuarioNormal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuUsuarioNormal],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuUsuarioNormal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
