import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-detail-modal',
  templateUrl: './info-detail-modal.component.html',
  styleUrls: ['./info-detail-modal.component.css']
})
export class InfoDetailModalComponent {
  @Input() selectedInfo: any = null;
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}