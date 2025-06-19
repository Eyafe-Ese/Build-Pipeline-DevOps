import { Injectable } from '@angular/core';
import { Customer } from '../customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [
    { 
      id: 1, 
      name: 'Ese Eyafe', 
      email: 'ese@gmail.com', 
      phone: '08127503292',
      gender: 'male',
      address: 'Gowon estate, Lagos'
    },
    { 
      id: 2, 
      name: 'Eguono Eyafe', 
      email: 'eguonoeyafe@gmail.com', 
      phone: '08078183392',
      gender: 'male',
      address: 'Gowon estate, Lagos'
    }
  ];
  private nextId = 3;

  getAllCustomers(): Customer[] {
    return [...this.customers];
  }

  getCustomerById(id: number): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }

  addCustomer(customer: Customer): void {
    customer.id = this.nextId++;
    this.customers.push({ ...customer });
  }

  updateCustomer(updatedCustomer: Customer): void {
    const index = this.customers.findIndex(customer => customer.id === updatedCustomer.id);
    if (index !== -1) {
      this.customers[index] = { ...updatedCustomer };
    }
  }

  deleteCustomer(id: number): void {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }
}
