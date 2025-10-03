import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
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