import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtakuRegisterComponent } from './otaku-register.component';

describe('OtakuRegisterComponent', () => {
  let component: OtakuRegisterComponent;
  let fixture: ComponentFixture<OtakuRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtakuRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtakuRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
