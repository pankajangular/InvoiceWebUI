import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRecordingComponent } from './time-recording.component';

describe('TimeRecordingComponent', () => {
  let component: TimeRecordingComponent;
  let fixture: ComponentFixture<TimeRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
