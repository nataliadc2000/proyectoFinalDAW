import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisBarcosComponent } from './mis-barcos.component';

describe('MisBarcosComponent', () => {
  let component: MisBarcosComponent;
  let fixture: ComponentFixture<MisBarcosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisBarcosComponent]
    });
    fixture = TestBed.createComponent(MisBarcosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
