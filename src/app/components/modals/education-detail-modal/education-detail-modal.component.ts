import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-education-detail-modal',
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