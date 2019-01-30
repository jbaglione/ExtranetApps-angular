import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBitacorasComponent } from './bitacoras-list.component';

describe('ListBitacorasComponent', () => {
  let component: ListBitacorasComponent;
  let fixture: ComponentFixture<ListBitacorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBitacorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBitacorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
