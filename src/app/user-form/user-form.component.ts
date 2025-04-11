import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  satisfactionValue: number = 5;
  selectedFileName: string = '';
  maxStars: number[] = [1, 2, 3, 4, 5];
  questionOptions: string[] = [
    'What is your favorite book?',
    'What is your dream vacation destination?',
    'If you could have any superpower, what would it be?',
    'What is your favorite hobby?',
    'What is your favorite food?'
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private formDataService: FormDataService
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      agreeTerms: [false, Validators.requiredTrue],
      gender: ['male', Validators.required],
      occupation: ['', Validators.required],
      comments: [''],
      birthDate: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
      satisfaction: [5],
      profilePic: [''],
      favoriteQuestion: ['', Validators.required],
      favoriteAnswer: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Initialize values
  }

  onSatisfactionChange(rating: number) {
    this.satisfactionValue = rating;
    this.userForm.get('satisfaction')?.setValue(rating);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFileName = input.files[0].name;
    } else {
      this.selectedFileName = '';
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Collect form data
      const formValues = this.userForm.value;
      
      // Add file name if available
      if (this.selectedFileName) {
        formValues.profilePic = this.selectedFileName;
      }
      
      // Save data to service
      this.formDataService.setFormData(formValues);
      
      // Navigate to results page
      this.router.navigate(['/result']);
    } else {
      // Mark all controls as touched to show validation errors
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onReset() {
    this.userForm.reset({
      gender: 'male',
      satisfaction: 5,
    });
    this.satisfactionValue = 5;
    this.selectedFileName = '';
  }

  // Helper functions for validation
  get f() { 
    return this.userForm.controls; 
  }
}
