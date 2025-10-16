import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.page.html',
  styleUrls: ['./sms-verification.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon, CommonModule, FormsModule]
})
export class SmsVerificationPage implements OnInit, OnDestroy, AfterViewInit {
  codeDigits: string[] = ['', '', '', '', '', ''];
  currentIndex: number = 0;
  timeLeft: number = 60; // 60 saniye
  timer: any;
  maskedPhoneNumber: string = '';
  private phoneNumber: string = '';
  
  @ViewChild('input0') input0!: ElementRef;
  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;
  @ViewChild('input3') input3!: ElementRef;
  @ViewChild('input4') input4!: ElementRef;
  @ViewChild('input5') input5!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Telefon numarasını al
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phone'] || '';
      this.maskedPhoneNumber = this.maskPhoneNumber(this.phoneNumber);
    });
    
    // Timer başlat
    this.startTimer();
  }

  ngAfterViewInit() {
    // İlk input'a focus ver
    setTimeout(() => {
      if (this.input0) {
        this.input0.nativeElement.focus();
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  maskPhoneNumber(phone: string): string {
    if (!phone) return '';
    
    // +90 5XX XXX XX XX formatından son 4 haneyi maskele
    const parts = phone.split(' ');
    if (parts.length >= 4) {
      const lastPart = parts[parts.length - 1];
      const masked = lastPart.substring(0, 2) + 'XX';
      parts[parts.length - 1] = masked;
      return parts.join(' ');
    }
    return phone;
  }

  startTimer() {
    this.timeLeft = 60;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onCodeInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Eğer değer boşsa, sadece temizle
    if (!value) {
      this.codeDigits[index] = '';
      return;
    }
    
    // Sadece son girilen karakteri al
    const lastChar = value.slice(-1);
    
    // Sadece rakam kabul et
    if (!/^\d$/.test(lastChar)) {
      // Geçersiz karakter girildi, eski değeri geri yükle
      input.value = this.codeDigits[index];
      return;
    }

    // Array'i güncelle
    this.codeDigits[index] = lastChar;
    
    // Input'un değerini güncelle
    input.value = lastChar;
    
    // Sonraki input'a geç
    if (lastChar && index < 5) {
      this.currentIndex = index + 1;
      
      // Sonraki input'a focus ver
      setTimeout(() => {
        const nextInput = this.getInputByIndex(index + 1);
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      }, 10);
    }
  }

  getInputByIndex(index: number): HTMLInputElement | null {
    switch (index) {
      case 0: return this.input0?.nativeElement;
      case 1: return this.input1?.nativeElement;
      case 2: return this.input2?.nativeElement;
      case 3: return this.input3?.nativeElement;
      case 4: return this.input4?.nativeElement;
      case 5: return this.input5?.nativeElement;
      default: return null;
    }
  }

  onInputBlur(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    // Blur olduğunda değeri senkronize et
    if (input.value !== this.codeDigits[index]) {
      input.value = this.codeDigits[index];
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.codeDigits[index] && index > 0) {
        // Önceki input'a geç ve temizle
        this.currentIndex = index - 1;
        setTimeout(() => {
          const prevInput = this.getInputByIndex(index - 1);
          if (prevInput) {
            prevInput.focus();
            prevInput.value = '';
            this.codeDigits[index - 1] = '';
          }
        }, 0);
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this.currentIndex = index - 1;
      setTimeout(() => {
        const prevInput = this.getInputByIndex(index - 1);
        if (prevInput) prevInput.focus();
      }, 0);
    } else if (event.key === 'ArrowRight' && index < 5) {
      this.currentIndex = index + 1;
      setTimeout(() => {
        const nextInput = this.getInputByIndex(index + 1);
        if (nextInput) nextInput.focus();
      }, 0);
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').substring(0, 6);
    
    for (let i = 0; i < 6; i++) {
      this.codeDigits[i] = digits[i] || '';
      const input = this.getInputByIndex(i);
      if (input) {
        input.value = this.codeDigits[i];
      }
    }
    
    // Son dolu input'a focus
    const lastFilledIndex = Math.min(digits.length - 1, 5);
    this.currentIndex = lastFilledIndex;
    
    setTimeout(() => {
      const lastInput = this.getInputByIndex(lastFilledIndex);
      if (lastInput) {
        lastInput.focus();
      }
    }, 10);
  }

  get isCodeComplete(): boolean {
    return this.codeDigits.every(digit => digit !== '');
  }

  verifyCode() {
    if (this.isCodeComplete) {
      const code = this.codeDigits.join('');
      console.log('Verification code:', code);
      
      // Simüle edilmiş doğrulama
      if (code === '123456') {
        // Başarılı doğrulama - navigate to onboarding
        this.router.navigate(['/onboarding']);
      } else {
        // Hatalı kod - kullanıcıya bildirim gösterilebilir
        console.log('Invalid code');
        // Kodları temizle
        this.codeDigits = ['', '', '', '', '', ''];
        this.currentIndex = 0;
      }
    }
  }

  resendCode(event: Event) {
    event.preventDefault();
    console.log('Resending code to:', this.phoneNumber);
    
    // Timer'ı yeniden başlat
    this.startTimer();
    
    // Kodları temizle
    this.codeDigits = ['', '', '', '', '', ''];
    this.currentIndex = 0;
    
    // Tüm input'ları temizle
    for (let i = 0; i < 6; i++) {
      const input = this.getInputByIndex(i);
      if (input) {
        input.value = '';
      }
    }
    
    // İlk input'a focus ver
    setTimeout(() => {
      const firstInput = this.getInputByIndex(0);
      if (firstInput) {
        firstInput.focus();
      }
    }, 10);
  }

  changePhoneNumber() {
    this.router.navigate(['/phone-login']);
  }

  goBack() {
    this.router.navigate(['/phone-login']);
  }
}
