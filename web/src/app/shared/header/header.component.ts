import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  isAuthenticated: boolean;

  @Output()
  toggleMenu = new EventEmitter();

  menuButtonClicked() {
    this.toggleMenu.emit();
  }
}
