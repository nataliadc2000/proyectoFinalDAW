import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBarcosComponent } from './listado-barcos.component';

describe('ListadoBarcosComponent', () => {
  let component: ListadoBarcosComponent;
  let fixture: ComponentFixture<ListadoBarcosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoBarcosComponent]
    });
    fixture = TestBed.createComponent(ListadoBarcosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
