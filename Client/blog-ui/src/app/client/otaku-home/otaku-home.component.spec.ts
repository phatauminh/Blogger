import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtakuHomeComponent } from './otaku-home.component';

describe('OtakuHomeComponent', () => {
  let component: OtakuHomeComponent;
  let fixture: ComponentFixture<OtakuHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtakuHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtakuHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
