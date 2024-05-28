import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSalidasComponent } from './listado-salidas.component';

describe('ListadoSalidasComponent', () => {
  let component: ListadoSalidasComponent;
  let fixture: ComponentFixture<ListadoSalidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoSalidasComponent]
    });
    fixture = TestBed.createComponent(ListadoSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
