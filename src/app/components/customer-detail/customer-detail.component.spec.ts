import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDetailComponent } from './customer-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // mock param observable
            snapshot: {
              paramMap: {
                get: () => '123' // mock snapshot access
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
