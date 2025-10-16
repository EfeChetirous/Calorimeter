import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon,
  IonProgressBar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface MealData {
  id: string;
  name: string;
  calories: number;
  time: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton,
    IonIcon,
    IonProgressBar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    CommonModule
  ],
})
export class HomePage implements OnInit {
  // Dashboard data
  dailyCalorieLimit: number = 2000; // Onboarding'den gelecek
  currentCalories: number = 0;
  meals: MealData[] = [
    { id: '1', name: 'Kahvaltı', calories: 450, time: '08:00' },
    { id: '2', name: 'Öğle Yemeği', calories: 650, time: '13:00' },
    { id: '3', name: 'Atıştırmalık', calories: 200, time: '16:00' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateTotalCalories();
  }

  calculateTotalCalories() {
    this.currentCalories = this.meals.reduce((total, meal) => total + meal.calories, 0);
  }

  getCalorieProgress(): number {
    return Math.min((this.currentCalories / this.dailyCalorieLimit) * 100, 100);
  }

  getRemainingCalories(): number {
    return Math.max(this.dailyCalorieLimit - this.currentCalories, 0);
  }

  addMeal() {
    this.router.navigate(['/add-meal']);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
}
