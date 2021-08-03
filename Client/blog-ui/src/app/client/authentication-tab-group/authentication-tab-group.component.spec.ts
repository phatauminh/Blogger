import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationTabGroupComponent } from './authentication-tab-group.component';

describe('AuthenticationTabGroupComponent', () => {
  let component: AuthenticationTabGroupComponent;
  let fixture: ComponentFixture<AuthenticationTabGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationTabGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
