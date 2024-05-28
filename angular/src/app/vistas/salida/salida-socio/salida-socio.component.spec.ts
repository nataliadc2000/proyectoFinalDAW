import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaSocioComponent } from './salida-socio.component';

describe('SalidaSocioComponent', () => {
  let component: SalidaSocioComponent;
  let fixture: ComponentFixture<SalidaSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalidaSocioComponent]
    });
    fixture = TestBed.createComponent(SalidaSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
