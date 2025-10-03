import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-work-detail-modal',
  templateUrl: './work-detail-modal.component.html',
  styleUrls: ['./work-detail-modal.component.scss']
})
export class WorkDetailModalComponent {
  @Input() selectedWork: any = null;
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}