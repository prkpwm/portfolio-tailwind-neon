import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  @Input() languages: any[] = [];
  @Input() programs: any[] = [];

  getSkillLevel(skill: any): number {
    return skill.late || 5;
  }
}