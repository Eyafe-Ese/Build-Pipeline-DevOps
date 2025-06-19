import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppComponent,
    CustomerDetailComponent, CustomerFormComponent
  ],
  providers: [],
})
export class AppModule { }
