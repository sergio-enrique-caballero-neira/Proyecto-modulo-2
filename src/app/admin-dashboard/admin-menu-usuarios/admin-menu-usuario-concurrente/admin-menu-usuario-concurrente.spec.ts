import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuUsuarioConcurrente } from './admin-menu-usuario-concurrente';

describe('AdminMenuUsuarioConcurrente', () => {
  let component: AdminMenuUsuarioConcurrente;
  let fixture: ComponentFixture<AdminMenuUsuarioConcurrente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMenuUsuarioConcurrente],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMenuUsuarioConcurrente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
