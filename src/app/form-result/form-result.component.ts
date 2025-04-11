import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormDataService, FormData } from '../form-data.service';

@Component({
  selector: 'app-form-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-result.component.html',
  styleUrl: './form-result.component.css'
})
export class FormResultComponent implements OnInit {
  formData: FormData = {};
  Object = Object; // Make Object available in template

  constructor(
    private router: Router, 
    private formDataService: FormDataService
  ) { }

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
    if (Object.keys(this.formData).length === 0) {
      this.router.navigate(['/form']);
    }
  }

  formatLabel(key: string): string {
    // Convert camelCase to Title Case with spaces
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  onBack() {
    this.router.navigate(['/form']);
  }
}
