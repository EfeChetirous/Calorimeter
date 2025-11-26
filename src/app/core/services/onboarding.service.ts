import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnboardingRequest } from '../models/onboarding-request.model';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OnboardingService {
    private apiUrl = `${environment.apiUrl}/OnboardingApi/SaveOnboardingValuesAndRegister`;

    constructor(private http: HttpClient) { }

    saveOnboardingValues(request: OnboardingRequest): Observable<any> {
        return this.http.post(this.apiUrl, request);
    }
}
