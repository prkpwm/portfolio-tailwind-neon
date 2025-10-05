import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education-detail-modal.component.html',
  styleUrls: ['./education-detail-modal.component.scss']
})
export class EducationDetailModalComponent {
  @Input() selectedEducation: any = null;
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}