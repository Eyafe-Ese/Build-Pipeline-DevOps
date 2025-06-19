import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DialogComponent],
  template: `
    <app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <app-dialog></app-dialog>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  `]
})
export class AppComponent {}
