import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSendComponent } from './alarm-send.component';

describe('AlarmSendComponent', () => {
  let component: AlarmSendComponent;
  let fixture: ComponentFixture<AlarmSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
