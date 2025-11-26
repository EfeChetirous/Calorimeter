import { Component, OnInit } from '@angular/core';
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

interface UserData {
  username: string;
  email: string;
  gender: string;
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
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // Component initialization
  }

  async onContinue() {
    // Validate form data
    if (this.isFormValid()) {
      console.log('User data:', this.user);

      // TODO: Send data to backend API
      // this.sendDataToBackend();

      // For now, navigate to home page
      this.router.navigate(['/home']);
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

  // TODO: Implement API call to send user data to backend
  private sendDataToBackend() {
    // This method will be implemented when backend integration is ready
    console.log('Sending user data to backend...');
  }
}
