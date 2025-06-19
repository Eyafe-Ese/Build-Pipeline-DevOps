import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // no params by default
            snapshot: {
              paramMap: {
                get: () => null // return null for any route param
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
