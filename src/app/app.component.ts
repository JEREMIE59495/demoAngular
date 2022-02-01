import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo du service';
  isVisible: boolean= true;
  showComponent(): void {
    this.isVisible = !this.isVisible
  }
}
