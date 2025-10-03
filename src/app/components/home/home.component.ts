import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() info: any[] = [];
  @Input() isOpenNewJob: boolean = false;
  @Output() navigateToSection = new EventEmitter<string>();

  onNavigateToSection(section: string) {
    this.navigateToSection.emit(section);
  }
}