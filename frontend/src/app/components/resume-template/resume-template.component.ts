import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperience, Education, Skill, Info } from '../../interfaces/portfolio.interface';
import {
  _WORK_EXPERIENCE,
  _EDUCATION_LIST,
  _LANGUAGE_LIST,
  _PROGRAMS_LIST,
  _INFO
} from '../../../data';

@Component({
  selector: 'app-resume-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.css']
})
export class ResumeTemplateComponent implements OnInit {
  workExperience: WorkExperience[] = _WORK_EXPERIENCE;
  education: Education[] = _EDUCATION_LIST;
  languages: Skill[] = _LANGUAGE_LIST;
  programs: Skill[] = _PROGRAMS_LIST;
  info: Info[] = _INFO;

  ngOnInit() {}

  get sortedWork(): WorkExperience[] {
    return this.workExperience.sort((a, b) => b.order - a.order);
  }

  get sortedEducation(): Education[] {
    return this.education.filter(edu => !edu.name.toLowerCase().includes('high school')).sort((a, b) => b.order - a.order);
  }

  get topSkills(): Skill[] {
    return this.languages.slice(0, 10);
  }

  get topTools(): Skill[] {
    return this.programs.slice(0, 10);
  }

  getSummary(): string {
    const customSummary = (window as any).customSummary;
    if (customSummary) {
      return customSummary;
    }
    const summaryInfo = this.info.find(item => item.title === '_SUMMARY');
    return summaryInfo ? summaryInfo.content.trim() : '';
  }

  getSkillsList(skills: Skill[]): string {
    return skills.map(skill => skill.name).join(', ');
  }

  printResume() {
    window.print();
  }
}
