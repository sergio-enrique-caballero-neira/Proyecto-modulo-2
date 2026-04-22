import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuPaqueteNoAlimenticio } from './admin-menu-paquete-no-alimenticio';

describe('AdminMenuPaqueteNoAlimenticio', () => {
  let component: AdminMenuPaqueteNoAlimenticio;
  let fixture: ComponentFixture<AdminMenuPaqueteNoAlimenticio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuPaqueteNoAlimenticio],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuPaqueteNoAlimenticio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
