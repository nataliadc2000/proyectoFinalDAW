import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSalidasComponent } from './mis-salidas.component';

describe('MisSalidasComponent', () => {
  let component: MisSalidasComponent;
  let fixture: ComponentFixture<MisSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisSalidasComponent]
    });
    fixture = TestBed.createComponent(MisSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
