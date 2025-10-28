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
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

interface UserData {
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

  constructor(private router: Router) { }

  ngOnInit() {
    // Component initialization
  }

  onContinue() {
    // Validate form data
    if (this.isFormValid()) {
      console.log('User data:', this.user);
      
      // TODO: Send data to backend API
      // this.sendDataToBackend();
      
      // For now, navigate to home page
      this.router.navigate(['/home']);
    } else {
      console.log('Form validation failed');
      // TODO: Show validation error message
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.user.email &&
      this.user.gender &&
      this.user.height &&
      this.user.weight &&
      this.user.targetCalorie
    );
  }

  // TODO: Implement API call to send user data to backend
  private sendDataToBackend() {
    // This method will be implemented when backend integration is ready
    console.log('Sending user data to backend...');
  }
}
