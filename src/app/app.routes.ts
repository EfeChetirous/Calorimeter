import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./onboarding/onboarding.page').then( m => m.OnboardingPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'add-meal',
    loadComponent: () => import('./add-meal/add-meal.page').then( m => m.AddMealPage)
  },
  // Geçici olarak devre dışı bırakılan ekranlar
  {
    path: 'phone-login',
    loadComponent: () => import('./phone-login/phone-login.page').then( m => m.PhoneLoginPage)
  },
  {
    path: 'sms-verification',
    loadComponent: () => import('./sms-verification/sms-verification.page').then( m => m.SmsVerificationPage)
  },
];
