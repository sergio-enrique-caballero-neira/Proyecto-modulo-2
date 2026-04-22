import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuCarta } from './admin-menu-carta';

describe('AdminMenuCarta', () => {
  let component: AdminMenuCarta;
  let fixture: ComponentFixture<AdminMenuCarta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuCarta],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuCarta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
