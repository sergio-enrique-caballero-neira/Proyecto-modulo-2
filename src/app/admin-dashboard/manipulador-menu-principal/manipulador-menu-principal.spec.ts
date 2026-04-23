import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipuladorMenuPrincipal } from './manipulador-menu-principal';

describe('ManipuladorMenuPrincipal', () => {
  let component: ManipuladorMenuPrincipal;
  let fixture: ComponentFixture<ManipuladorMenuPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManipuladorMenuPrincipal],
    }).compileComponents();

    fixture = TestBed.createComponent(ManipuladorMenuPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
