import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPatronComponent } from './agregar-patron.component';

describe('AgregarPatronComponent', () => {
  let component: AgregarPatronComponent;
  let fixture: ComponentFixture<AgregarPatronComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPatronComponent]
    });
    fixture = TestBed.createComponent(AgregarPatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
