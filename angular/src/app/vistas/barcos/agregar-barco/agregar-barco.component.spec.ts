import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarBarcoComponent } from './agregar-barco.component';

describe('AgregarBarcoComponent', () => {
  let component: AgregarBarcoComponent;
  let fixture: ComponentFixture<AgregarBarcoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarBarcoComponent]
    });
    fixture = TestBed.createComponent(AgregarBarcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
