import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorMenuActualizar } from './conductor-menu-actualizar';

describe('ConductorMenuActualizar', () => {
  let component: ConductorMenuActualizar;
  let fixture: ComponentFixture<ConductorMenuActualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConductorMenuActualizar],
    }).compileComponents();

    fixture = TestBed.createComponent(ConductorMenuActualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
