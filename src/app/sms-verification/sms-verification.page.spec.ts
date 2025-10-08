import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmsVerificationPage } from './sms-verification.page';

describe('SmsVerificationPage', () => {
  let component: SmsVerificationPage;
  let fixture: ComponentFixture<SmsVerificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
