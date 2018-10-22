import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHallazgosComponent } from './hallazgos-list.component';

describe('ListHallazgosComponent', () => {
  let component: ListHallazgosComponent;
  let fixture: ComponentFixture<ListHallazgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHallazgosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHallazgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
