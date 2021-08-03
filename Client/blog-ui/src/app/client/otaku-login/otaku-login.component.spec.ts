import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtakuLoginComponent } from './otaku-login.component';

describe('OtakuLoginComponent', () => {
  let component: OtakuLoginComponent;
  let fixture: ComponentFixture<OtakuLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtakuLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtakuLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
