import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmRuleClientComponent } from './alarm-rule-client.component';

describe('AlarmRuleClientComponent', () => {
  let component: AlarmRuleClientComponent;
  let fixture: ComponentFixture<AlarmRuleClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmRuleClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmRuleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
