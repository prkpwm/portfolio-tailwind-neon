import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  @Input() workExperience: any[] = [];
  @Output() showWorkDetail = new EventEmitter<any>();

  onShowWorkDetail(work: any) {
    this.showWorkDetail.emit(work);
  }
}