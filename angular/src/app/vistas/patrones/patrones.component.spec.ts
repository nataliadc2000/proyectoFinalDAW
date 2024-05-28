import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronesComponent } from './patrones.component';

describe('PatronesComponent', () => {
  let component: PatronesComponent;
  let fixture: ComponentFixture<PatronesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatronesComponent]
    });
    fixture = TestBed.createComponent(PatronesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
