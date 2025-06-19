import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="app-header">
      <div class="logo-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/GTCO_logo.svg" alt="GTBank Logo" class="logo">
      </div>
      <h1>Customer Management System</h1>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      align-items: center;
      padding: 15px 30px;
      background-color: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
    
    .logo-container {
      margin-right: 20px;
    }
    
    .logo {
      height: 40px;
      width: auto;
    }
    
    h1 {
      color: var(--primary-color);
      margin: 0;
      font-size: 22px;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .app-header {
        flex-direction: column;
        padding: 15px;
      }
      
      .logo-container {
        margin-right: 0;
        margin-bottom: 10px;
      }
      
      h1 {
        font-size: 18px;
      }
    }
  `]
})
export class HeaderComponent {}
