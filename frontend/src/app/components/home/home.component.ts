import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() info: any[] = [];
  @Input() isOpenNewJob: boolean = false;
  @Output() navigateToSection = new EventEmitter<string>();

  onNavigateToSection(section: string) {
    this.navigateToSection.emit(section);
  }
}