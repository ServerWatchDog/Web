import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperateLogComponent } from './operate-log.component';

describe('OperateLogComponent', () => {
  let component: OperateLogComponent;
  let fixture: ComponentFixture<OperateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
