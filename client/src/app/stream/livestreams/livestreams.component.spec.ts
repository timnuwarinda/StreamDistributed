import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestreamsComponent } from './livestreams.component';

describe('LivestreamsComponent', () => {
  let component: LivestreamsComponent;
  let fixture: ComponentFixture<LivestreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
