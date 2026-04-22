import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuPrincipal } from './admin-menu-principal';

describe('AdminMenuPrincipal', () => {
  let component: AdminMenuPrincipal;
  let fixture: ComponentFixture<AdminMenuPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuPrincipal],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
