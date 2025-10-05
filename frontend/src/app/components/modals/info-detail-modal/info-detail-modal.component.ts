import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-detail-modal.component.html',
  styleUrls: ['./info-detail-modal.component.scss']
})
export class InfoDetailModalComponent {
  @Input() selectedInfo: any = null;
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}