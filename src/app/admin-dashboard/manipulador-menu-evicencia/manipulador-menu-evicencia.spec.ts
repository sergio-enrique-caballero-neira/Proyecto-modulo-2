import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipuladorMenuEvicencia } from './manipulador-menu-evicencia';

describe('ManipuladorMenuEvicencia', () => {
  let component: ManipuladorMenuEvicencia;
  let fixture: ComponentFixture<ManipuladorMenuEvicencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManipuladorMenuEvicencia],
    }).compileComponents();

    fixture = TestBed.createComponent(ManipuladorMenuEvicencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
