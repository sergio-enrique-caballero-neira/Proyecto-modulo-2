import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipuladorMenuActualizar } from './manipulador-menu-actualizar';

describe('ManipuladorMenuActualizar', () => {
  let component: ManipuladorMenuActualizar;
  let fixture: ComponentFixture<ManipuladorMenuActualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManipuladorMenuActualizar],
    }).compileComponents();

    fixture = TestBed.createComponent(ManipuladorMenuActualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
