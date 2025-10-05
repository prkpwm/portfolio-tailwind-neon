import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  @Input() languages: any[] = [];
  @Input() programs: any[] = [];

  getSkillLevel(skill: any): number {
    return skill.late || 5;
  }

  getSkillLevelText(skill: any): string {
    const level = this.getSkillLevel(skill);
    if (level >= 9) return 'Expert';
    if (level >= 7) return 'Good';
    if (level >= 5) return 'Medium';
    if (level >= 3) return 'Basic';
    return 'Beginner';
  }
}