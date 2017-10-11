import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginhistoryComponent } from './loginhistory.component';

describe('LoginhistoryComponent', () => {
  let component: LoginhistoryComponent;
  let fixture: ComponentFixture<LoginhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
