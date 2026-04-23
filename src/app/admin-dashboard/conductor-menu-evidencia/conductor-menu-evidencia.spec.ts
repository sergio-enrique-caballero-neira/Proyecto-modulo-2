import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorMenuEvidencia } from './conductor-menu-evidencia';

describe('ConductorMenuEvidencia', () => {
  let component: ConductorMenuEvidencia;
  let fixture: ComponentFixture<ConductorMenuEvidencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConductorMenuEvidencia],
    }).compileComponents();

    fixture = TestBed.createComponent(ConductorMenuEvidencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
