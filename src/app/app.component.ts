import { Component, OnInit } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ChatService } from './services/chat.service';
import { LocationService } from './services/location.service';
import { EmailService } from './services/email.service';
import { CookieService } from './services/cookie.service';
import { ChatMessage, Project, WorkExperience, Education, Skill, Question, Info } from './interfaces/portfolio.interface';
import {
  _WORK_EXPERIENCE,
  _PROJECT_LIST,
  _EDUCATION_LIST,
  _LANGUAGE_LIST,
  _PROGRAMS_LIST,
  _INFO,
  _QUESTIONS
} from '../data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pakpoom Srisen - Portfolio';

  workExperience: WorkExperience[] = _WORK_EXPERIENCE;
  projects: Project[] = _PROJECT_LIST;
  education: Education[] = _EDUCATION_LIST;
  languages: Skill[] = _LANGUAGE_LIST;
  programs: Skill[] = _PROGRAMS_LIST;
  info: Info[] = _INFO;
  questions: Question[] = _QUESTIONS;

  currentSection: string = 'home';
  chatMessages: ChatMessage[] = [];
  userInput: string = '';
  mobileMenuOpen: boolean = false;
  mobileLinksOpen: boolean = false;
  showLinksMenu: boolean = false;
  selectedProject: Project | null = null;
  selectedEducation: Education | null = null;
  selectedWork: WorkExperience | null = null;
  selectedInfo: Info | null = null;
  isLoading: boolean = false;
  mouseX: number = 0;
  mouseY: number = 0;
  isOpenNewJob: boolean = false;

  constructor(private chatService: ChatService, private locationService: LocationService, private emailService: EmailService, private cookieService: CookieService) { }

  ngOnInit() {
    this.addBotMessage('Hello! I\'m Pakpoom\'s AI assistant. Ask me anything about his experience, skills, or projects!');
    this.getLocationFromIP();
  }

  private getLocationFromIP() {
    const emailSent = this.cookieService.getCookie('locationEmailSent');
    if (emailSent) {
      return;
    }

    this.locationService.getUserLocation().pipe(
      map(location => {
        return location;
      }),
      switchMap(location => this.emailService.sendLocationEmail(location)),
      map(() => {
        this.cookieService.setCookie('locationEmailSent', 'true', 365);
      }),
      catchError(error => {
        return EMPTY;
      })
    ).subscribe();
  }



  navigateToSection(section: string) {
    this.currentSection = section;
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleMobileLinks() {
    this.mobileLinksOpen = !this.mobileLinksOpen;
  }

  toggleLinksMenu() {
    this.showLinksMenu = !this.showLinksMenu;
  }

  showProjectDetail(project: Project) {
    this.selectedProject = project;
  }

  closeProjectDetail() {
    this.selectedProject = null;
  }

  showEducationDetail(education: Education) {
    this.selectedEducation = education;
  }

  closeEducationDetail() {
    this.selectedEducation = null;
  }

  showWorkDetail(work: WorkExperience) {
    this.selectedWork = work;
  }

  closeWorkDetail() {
    this.selectedWork = null;
  }

  showInfoDetail(info: Info) {
    this.selectedInfo = info;
  }

  closeInfoDetail() {
    this.selectedInfo = null;
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    this.chatMessages.push({ type: 'user', message: this.userInput });
    this.isLoading = true;

    const portfolioContext = this.buildPortfolioContext();
    this.chatService.getAIResponse(this.userInput, portfolioContext, this.questions).subscribe({
      next: (response) => {
        this.addBotMessage(response);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });

    this.userInput = '';
  }



  private buildPortfolioContext(): string {
    return JSON.stringify({
      info: this.info,
      workExperience: this.workExperience,
      projects: this.projects.slice(0, 5),
      education: this.education,
      skills: {
        languages: this.languages.slice(0, 10),
        tools: this.programs.slice(0, 10)
      }
    });
  }



  private addBotMessage(message: string) {
    this.chatMessages.push({ type: 'bot', message });
  }

  getSkillLevel(skill: Skill): number {
    return skill.late || 5;
  }

  get sortedProjects(): Project[] {
    return this.projects.sort((a, b) => b.order - a.order);
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  onMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX - window.innerWidth / 2) * 0.1;
    this.mouseY = (event.clientY - window.innerHeight / 2) * 0.1;
  }

  openResume() {
    window.open(
      'https://drive.google.com/file/d/1jlfeIzIypxySvbiObTUOc-j8tqYV4kGO/view?usp=drive_link',
      '_blank'
    );
  }

  openGithub() {
    window.open('https://github.com/prkpwm', '_blank');
  }

  openLinkedin() {
    window.open('https://www.linkedin.com/in/prkpwm/', '_blank');
  }
}
