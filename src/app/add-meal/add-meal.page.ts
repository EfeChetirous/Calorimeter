import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonButton, 
  IonInput, 
  IonLabel,
  IonItem,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, CameraPermissionType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.page.html',
  styleUrls: ['./add-meal.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonButton, 
    IonInput, 
    IonLabel,
    IonItem,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons,
    CommonModule, 
    FormsModule
  ]
})
export class AddMealPage implements OnInit {
  // Form data
  mealName: string = '';
  calories: number | null = null;
  notes: string = '';
  
  // Photo data
  capturedPhoto: string | null = null;
  isPhotoCaptured: boolean = false;
  
  // UI states
  isSubmitting: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // Component initialization
  }

  async capturePhoto() {
    try {
      // Check if running on native platform
      if (!Capacitor.isNativePlatform()) {
        console.log('Running on web platform, using file input fallback');
        this.openFileInput();
        return;
      }

      // Check camera permissions first
      const permissions = await Camera.checkPermissions();
      console.log('Camera permissions:', permissions);
      
      if (permissions.camera !== 'granted') {
        console.log('Requesting camera permission...');
        const requestResult = await Camera.requestPermissions();
        console.log('Permission request result:', requestResult);
        
        if (requestResult.camera !== 'granted') {
          console.error('Camera permission denied');
          alert('Camera permission is required to take photos');
          return;
        }
      }

      console.log('Opening camera...');
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      console.log('Photo captured, processing...');
      this.capturedPhoto = image.dataUrl || null;
      this.isPhotoCaptured = true;
      console.log('Photo captured successfully');
    } catch (error) {
      console.error('Error capturing photo:', error);
      alert('Error taking photo: ' + (error as Error).message);
    }
  }

  async selectFromGallery() {
    try {
      // Check if running on native platform
      if (!Capacitor.isNativePlatform()) {
        console.log('Running on web platform, using file input fallback');
        this.openFileInput();
        return;
      }

      // Check photo library permissions
      const permissions = await Camera.checkPermissions();
      console.log('Photo library permissions:', permissions);
      
      if (permissions.photos !== 'granted') {
        console.log('Requesting photo library permission...');
        const requestResult = await Camera.requestPermissions();
        console.log('Permission request result:', requestResult);
        
        if (requestResult.photos !== 'granted') {
          console.error('Photo library permission denied');
          alert('Photo library permission is required to select photos');
          return;
        }
      }

      console.log('Opening photo gallery...');
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      console.log('Photo selected, processing...');
      this.capturedPhoto = image.dataUrl || null;
      this.isPhotoCaptured = true;
      console.log('Photo selected from gallery successfully');
    } catch (error) {
      console.error('Error selecting photo:', error);
      alert('Error selecting photo: ' + (error as Error).message);
    }
  }

  removePhoto() {
    this.capturedPhoto = null;
    this.isPhotoCaptured = false;
  }

  retakePhoto() {
    this.capturePhoto();
  }

  saveMeal() {
    if (!this.mealName.trim() || !this.calories) {
      console.log('Please fill in meal name and calories');
      // TODO: Show validation error
      return;
    }

    this.isSubmitting = true;

    const mealData = {
      id: Date.now().toString(),
      name: this.mealName.trim(),
      calories: this.calories,
      notes: this.notes.trim(),
      photo: this.capturedPhoto,
      time: new Date().toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      date: new Date().toISOString()
    };

    console.log('Saving meal:', mealData);
    
    // TODO: Save to backend/local storage
    // For now, just simulate saving
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/home']);
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  isFormValid(): boolean {
    return !!(this.mealName.trim() && this.calories && this.calories > 0);
  }

  openFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.processFile(file);
      }
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  processFile(file: File | null) {
    if (!file) {
      return;
    }
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.capturedPhoto = e.target.result;
        this.isPhotoCaptured = true;
        console.log('File processed successfully');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file');
    }
  }
}
