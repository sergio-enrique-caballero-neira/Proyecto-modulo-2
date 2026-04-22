import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuConductor } from './admin-menu-conductor';

describe('AdminMenuConductor', () => {
  let component: AdminMenuConductor;
  let fixture: ComponentFixture<AdminMenuConductor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuConductor],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuConductor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
