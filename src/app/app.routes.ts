import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { FormResultComponent } from './form-result/form-result.component';

export const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: UserFormComponent },
  { path: 'result', component: FormResultComponent },
  { path: '**', redirectTo: '/form' }
];
