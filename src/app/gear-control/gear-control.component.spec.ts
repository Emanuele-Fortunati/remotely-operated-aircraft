import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { GearControlComponent } from './gear-control.component';

describe('GearControlComponent', () => {
  let component: GearControlComponent;
  let fixture: ComponentFixture<GearControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearControlComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
