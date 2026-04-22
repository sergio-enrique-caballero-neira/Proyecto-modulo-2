import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuUsuarioPremium } from './admin-menu-usuario-premium';

describe('AdminMenuUsuarioPremium', () => {
  let component: AdminMenuUsuarioPremium;
  let fixture: ComponentFixture<AdminMenuUsuarioPremium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuUsuarioPremium],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuUsuarioPremium);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
