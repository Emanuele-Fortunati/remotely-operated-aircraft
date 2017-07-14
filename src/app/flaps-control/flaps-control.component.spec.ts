import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlapsControlComponent } from './flaps-control.component';

describe('FlapsControlComponent', () => {
  let component: FlapsControlComponent;
  let fixture: ComponentFixture<FlapsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlapsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlapsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
