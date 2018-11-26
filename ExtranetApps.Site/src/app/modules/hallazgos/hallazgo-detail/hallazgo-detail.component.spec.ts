import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallazgoDetailComponent } from './hallazgo-detail.component';

describe('HallazgoDetailComponent', () => {
  let component: HallazgoDetailComponent;
  let fixture: ComponentFixture<HallazgoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallazgoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallazgoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
