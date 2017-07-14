import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComService } from '../com.service';

import { ConnectionStateComponent } from './connection-state.component';

describe('ConnectionStateComponent', () => {
  let component: ConnectionStateComponent;
  let fixture: ComponentFixture<ConnectionStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionStateComponent ],
      providers: [ ComService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
