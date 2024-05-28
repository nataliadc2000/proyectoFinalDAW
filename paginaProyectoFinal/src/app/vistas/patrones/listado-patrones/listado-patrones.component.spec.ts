import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPatronesComponent } from './listado-patrones.component';

describe('ListadoPatronesComponent', () => {
  let component: ListadoPatronesComponent;
  let fixture: ComponentFixture<ListadoPatronesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoPatronesComponent]
    });
    fixture = TestBed.createComponent(ListadoPatronesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
