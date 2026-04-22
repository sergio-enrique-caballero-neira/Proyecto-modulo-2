import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuPaqueteAlimenticio } from './admin-menu-paquete-alimenticio';

describe('AdminMenuPaqueteAlimenticio', () => {
  let component: AdminMenuPaqueteAlimenticio;
  let fixture: ComponentFixture<AdminMenuPaqueteAlimenticio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuPaqueteAlimenticio],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuPaqueteAlimenticio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
