import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFormComponent } from './customer-form.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // mock route param
            snapshot: {
              paramMap: {
                get: () => '123' // optional fallback for snapshot-based access
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
