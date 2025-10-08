import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'phone-login',
    loadComponent: () => import('./phone-login/phone-login.page').then( m => m.PhoneLoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'phone-login',
    pathMatch: 'full',
  },
  {
    path: 'sms-verification',
    loadComponent: () => import('./sms-verification/sms-verification.page').then( m => m.SmsVerificationPage)
  },
];
