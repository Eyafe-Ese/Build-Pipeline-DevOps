import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { DialogService } from '../../services/dialog.service';
import { Customer } from '../../customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  filterText: string = '';

  constructor(
    private customerService: CustomerService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = this.customerService.getAllCustomers();
    this.filteredCustomers = [...this.customers];
  }

  filterList(): void {
    if (!this.filterText) {
      this.filteredCustomers = [...this.customers];
    } else {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.filterText.toLowerCase()) ||
        customer.phone.includes(this.filterText)
      );
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/customer', id]);
  }

  editCustomer(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteCustomer(id: number): void {
    this.dialogService.confirm({
      title: 'Delete Customer',
      message: 'Are you sure you want to delete this customer? This action cannot be undone.'
    }).subscribe(result => {
      if (result) {
        this.customerService.deleteCustomer(id);
        this.loadCustomers();
      }
    });
  }
}
