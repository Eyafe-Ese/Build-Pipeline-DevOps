import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface DialogData {
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogSubject = new Subject<{ data: DialogData, result: Subject<boolean> }>();
  
  public dialog$ = this.dialogSubject.asObservable();
  
  constructor() { }
  
  confirm(data: DialogData): Observable<boolean> {
    const result = new Subject<boolean>();
    this.dialogSubject.next({ data, result });
    return result.asObservable();
  }
}