import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" *ngIf="isVisible">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2>{{ data?.title }}</h2>
        </div>
        <div class="dialog-content">
          <p>{{ data?.message }}</p>
        </div>
        <div class="dialog-actions">
          <button class="cancel-btn" (click)="onCancel()">Cancel</button>
          <button class="confirm-btn" (click)="onConfirm()">Confirm</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    
    .dialog-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      width: 90%;
      max-width: 500px;
      overflow: hidden;
    }
    
    .dialog-header {
      padding: 20px;
      background-color: white;
      color: white;
    }
    
    .dialog-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
    
    .dialog-content {
      padding: 20px;
      font-size: 16px;
      color: var(--text-color);
    }
    
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      padding: 15px 20px;
      background-color: #f5f5f5;
      gap: 15px;
    }
    
    .cancel-btn {
      background-color: #95a5a6;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .confirm-btn {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .cancel-btn:hover, .confirm-btn:hover {
      transform: translateY(-2px);
    }
    
    .cancel-btn:hover {
      background-color: #7f8c8d;
    }
    
    .confirm-btn:hover {
      background-color: #c0392b;
    }
  `]
})
export class DialogComponent implements OnInit, OnDestroy {
  isVisible = false;
  data: any = null;
  private resultSubject: Subject<boolean> | null = null;
  private subscription: Subscription | null = null;
  
  constructor(private dialogService: DialogService) { }
  
  ngOnInit(): void {
    this.subscription = this.dialogService.dialog$.subscribe(dialog => {
      this.data = dialog.data;
      this.resultSubject = dialog.result;
      this.isVisible = true;
    });
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  onConfirm(): void {
    if (this.resultSubject) {
      this.resultSubject.next(true);
      this.resultSubject.complete();
    }
    this.isVisible = false;
  }
  
  onCancel(): void {
    if (this.resultSubject) {
      this.resultSubject.next(false);
      this.resultSubject.complete();
    }
    this.isVisible = false;
  }
}
