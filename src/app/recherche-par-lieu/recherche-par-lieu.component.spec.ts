import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParLieuComponent } from './recherche-par-lieu.component';

describe('RechercheParLieuComponent', () => {
  let component: RechercheParLieuComponent;
  let fixture: ComponentFixture<RechercheParLieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercheParLieuComponent]
    });
    fixture = TestBed.createComponent(RechercheParLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
