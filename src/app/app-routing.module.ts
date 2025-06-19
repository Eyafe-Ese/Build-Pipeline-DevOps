import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'customer/:id', component: CustomerDetailComponent },
  { path: 'add', component: CustomerFormComponent },
  { path: 'edit/:id', component: CustomerFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }