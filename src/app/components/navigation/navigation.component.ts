import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() currentSection: string = 'home';
  @Input() mobileMenuOpen: boolean = false;
  @Input() mobileLinksOpen: boolean = false;
  @Input() showLinksMenu: boolean = false;

  @Output() sectionChange = new EventEmitter<string>();
  @Output() toggleMobileMenu = new EventEmitter<void>();
  @Output() toggleMobileLinks = new EventEmitter<void>();
  @Output() toggleLinksMenu = new EventEmitter<void>();
  @Output() openResume = new EventEmitter<void>();
  @Output() openGithub = new EventEmitter<void>();
  @Output() openLinkedin = new EventEmitter<void>();

  navigateToSection(section: string) {
    this.sectionChange.emit(section);
  }

  onToggleMobileMenu() {
    this.toggleMobileMenu.emit();
  }

  onToggleMobileLinks() {
    this.toggleMobileLinks.emit();
  }

  onToggleLinksMenu() {
    this.toggleLinksMenu.emit();
  }

  onOpenResume() {
    this.openResume.emit();
  }

  onOpenGithub() {
    this.openGithub.emit();
  }

  onOpenLinkedin() {
    this.openLinkedin.emit();
  }
}