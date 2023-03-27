import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupeventComponent } from './cupevent.component';

describe('CupeventComponent', () => {
  let component: CupeventComponent;
  let fixture: ComponentFixture<CupeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
