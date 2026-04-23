import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductorMenuPrincipal } from './conductor-menu-principal';

describe('ConductorMenuPrincipal', () => {
  let component: ConductorMenuPrincipal;
  let fixture: ComponentFixture<ConductorMenuPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConductorMenuPrincipal],
    }).compileComponents();

    fixture = TestBed.createComponent(ConductorMenuPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
