import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FormData {
  fullName?: string;
  password?: string;
  email?: string;
  agreeTerms?: boolean;
  gender?: string;
  occupation?: string;
  comments?: string;
  birthDate?: string;
  age?: number;
  satisfaction?: number;
  profilePic?: string;
  favoriteQuestion?: string;
  favoriteAnswer?: string;
  [key: string]: any; // Add index signature to allow string keys
}

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<FormData>({});
  formData$ = this.formDataSubject.asObservable();

  constructor() { }

  setFormData(data: FormData) {
    this.formDataSubject.next(data);
  }

  getFormData() {
    return this.formDataSubject.value;
  }

  clearFormData() {
    this.formDataSubject.next({});
  }
}
