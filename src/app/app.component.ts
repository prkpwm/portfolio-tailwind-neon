import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  
  workExperience = _WORK_EXPERIENCE;
  projects = _PROJECT_LIST;
  education = _EDUCATION_LIST;
  languages = _LANGUAGE_LIST;
  programs = _PROGRAMS_LIST;
  info = _INFO;
  questions = _QUESTIONS;
  
  currentSection = 'home';
  chatMessages: Array<{type: 'user' | 'bot', message: string}> = [];
  userInput = '';
  mobileMenuOpen = false;
  mobileLinksOpen = false;
  showLinksMenu = false;
  selectedProject: any = null;
  selectedEducation: any = null;
  selectedWork: any = null;
  selectedInfo: any = null;
  isLoading = false;
  mouseX = 0;
  mouseY = 0;
  isOpenNewJob = false;
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.addBotMessage('Hello! I\'m Pakpoom\'s AI assistant. Ask me anything about his experience, skills, or projects!');
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
  
  showProjectDetail(project: any) {
    this.selectedProject = project;
  }
  
  closeProjectDetail() {
    this.selectedProject = null;
  }
  
  showEducationDetail(education: any) {
    this.selectedEducation = education;
  }
  
  closeEducationDetail() {
    this.selectedEducation = null;
  }
  
  showWorkDetail(work: any) {
    this.selectedWork = work;
  }
  
  closeWorkDetail() {
    this.selectedWork = null;
  }
  
  showInfoDetail(info: any) {
    this.selectedInfo = info;
  }
  
  closeInfoDetail() {
    this.selectedInfo = null;
  }
  
  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;
    
    this.chatMessages.push({ type: 'user', message: this.userInput });
    this.isLoading = true;
    
    this.getAIResponse(this.userInput).subscribe({
      next: (response) => {
        this.addBotMessage(response);
        this.isLoading = false;
      },
      error: () => {
        const fallbackResponse = this.findAnswer(this.userInput);
        this.addBotMessage(fallbackResponse);
        this.isLoading = false;
      }
    });
    
    this.userInput = '';
  }
  
  private getAIResponse(question: string): Observable<string> {
    const portfolioContext = this.buildPortfolioContext();
    const prompt = `Context: ${portfolioContext}\n\nQuestion: ${question}\n\nAnswer as Pakpoom's AI assistant:`;
    
    return this.http.post<any>('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      inputs: prompt,
      parameters: {
        max_length: 150,
        temperature: 0.7,
        return_full_text: false
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(response => response[0]?.generated_text || this.findAnswer(question)),
      catchError(() => of(this.findAnswer(question)))
    );
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
  
  private findAnswer(question: string): string {
    const lowerQuestion = question.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    for (const q of this.questions) {
      const similarity = this.calculateSimilarity(lowerQuestion, q.question.toLowerCase());
      if (similarity > bestScore && similarity > 0.3) {
        bestScore = similarity;
        bestMatch = q;
      }
    }
    
    return bestMatch ? bestMatch.answer : 'I\'m not sure about that. Could you ask something else about Pakpoom\'s experience or skills?';
  }
  
  private calculateSimilarity(str1: string, str2: string): number {
    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    return maxLength === 0 ? 1 : 1 - distance / maxLength;
  }
  
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  private addBotMessage(message: string) {
    this.chatMessages.push({ type: 'bot', message });
  }
  
  getSkillLevel(skill: any): number {
    return skill.late || 5;
  }
  
  get sortedProjects() {
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
