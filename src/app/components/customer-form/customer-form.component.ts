import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const existingCustomer = this.customerService.getCustomerById(+id);
      if (existingCustomer) {
        this.customer = { ...existingCustomer };
      }
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.customerService.updateCustomer(this.customer);
    } else {
      this.customerService.addCustomer(this.customer);
    }
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
