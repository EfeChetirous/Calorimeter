import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { OnboardingService } from '../core/services/onboarding.service';
import { OnboardingRequest } from '../core/models/onboarding-request.model';

interface UserData {
  username: string;
  email: string;
  gender: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  targetCalorie: number | null;
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class OnboardingPage implements OnInit {
  user: UserData = {
    username: '',
    email: '',
    gender: '',
    age: null,
    height: null,
    weight: null,
    targetCalorie: null
  };

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  constructor(
    private router: Router,
    private toastController: ToastController,
    private onboardingService: OnboardingService
  ) { }

  ngOnInit() {
    // Component initialization
  }

  async onContinue() {
    // Validate form data
    if (this.isFormValid()) {
      console.log('User data:', this.user);

      await this.sendDataToBackend();
    } else {
      console.log('Form validation failed');
      await this.showValidationError();
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.user.username &&
      this.user.email &&
      this.isValidEmail(this.user.email) &&
      this.user.gender &&
      this.user.height &&
      this.user.weight &&
      this.user.age &&
      this.user.targetCalorie
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async showValidationError() {
    let message = 'Please fill in all fields.';
    if (this.user.email && !this.isValidEmail(this.user.email)) {
      message = 'Please enter a valid email address.';
    }

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  private async sendDataToBackend() {
    const deviceId = await Device.getId();

    const request: OnboardingRequest = {
      userName: this.user.username,
      gender: this.user.gender,
      age: this.user.age!,
      email: this.user.email,
      height: this.user.height!,
      weight: this.user.weight!,
      deviceId: deviceId.identifier,
      targetCalories: this.user.targetCalorie!.toString(),
      jwtToken: ''
    };

    this.onboardingService.saveOnboardingValues(request).subscribe({
      next: (response) => {
        console.log('Onboarding success:', response);
        this.router.navigate(['/home']);
      },
      error: async (error) => {
        console.error('Onboarding error:', error);
        const toast = await this.toastController.create({
          message: 'Failed to save data. Please try again.',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
