import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuAdministrador } from './admin-menu-administrador';

describe('AdminMenuAdministrador', () => {
  let component: AdminMenuAdministrador;
  let fixture: ComponentFixture<AdminMenuAdministrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuAdministrador],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuAdministrador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
