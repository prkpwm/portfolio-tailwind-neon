import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  @Input() projects: any[] = [];
  @Output() showProjectDetail = new EventEmitter<any>();
  @Output() showProjectRange = new EventEmitter<any>();

  get sortedProjects() {
    return this.projects.sort((a, b) => b.order - a.order);
  }

  onShowProjectDetail(project: any) {
    this.showProjectDetail.emit(project);
  }

  onShowProjectRange(project: any) {
    this.showProjectRange.emit(project);
  }
}