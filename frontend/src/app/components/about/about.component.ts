import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  @Input() info: any[] = [];
  @Input() education: any[] = [];
  @Output() showInfoDetail = new EventEmitter<any>();
  @Output() showEducationDetail = new EventEmitter<any>();

  onShowInfoDetail(info: any) {
    this.showInfoDetail.emit(info);
  }

  onShowEducationDetail(education: any) {
    this.showEducationDetail.emit(education);
  }
}