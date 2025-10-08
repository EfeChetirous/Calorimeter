import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.page.html',
  styleUrls: ['./phone-login.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, CommonModule, FormsModule]
})
export class PhoneLoginPage implements OnInit {
  phoneNumber: string = '';
  isValidPhone: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  formatPhoneNumber(event: any) {
    let value = event.detail.value.replace(/\D/g, '');
    
    if (value.startsWith('90')) {
      value = value.substring(2);
    }
    
    if (value.length > 0) {
      if (value.length <= 3) {
        this.phoneNumber = `+90 ${value}`;
      } else if (value.length <= 6) {
        this.phoneNumber = `+90 ${value.slice(0, 3)} ${value.slice(3)}`;
      } else if (value.length <= 8) {
        this.phoneNumber = `+90 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
      } else if (value.length <= 10) {
        this.phoneNumber = `+90 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8)}`;
      } else {
        this.phoneNumber = `+90 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8, 10)}`;
      }
    }
    
    this.validatePhone();
  }

  validatePhone() {
    const phoneRegex = /^\+90 5\d{2} \d{3} \d{2} \d{2}$/;
    this.isValidPhone = phoneRegex.test(this.phoneNumber);
  }

  onContinue() {
    if (this.isValidPhone) {
      // Telefon numarası doğrulama işlemi burada yapılabilir
      console.log('Phone number:', this.phoneNumber);
      // SMS doğrulama sayfasına yönlendirme
      this.router.navigate(['/sms-verification'], {
        queryParams: { phone: this.phoneNumber }
      });
    }
  }
}
