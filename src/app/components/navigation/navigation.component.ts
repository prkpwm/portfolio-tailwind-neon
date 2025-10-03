import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() currentSection: string = 'home';
  @Input() mobileMenuOpen: boolean = false;
  @Input() mobileLinksOpen: boolean = false;
  @Input() showLinksMenu: boolean = false;

  @Output() navigateToSection = new EventEmitter<string>();
  @Output() toggleMobileMenu = new EventEmitter<void>();
  @Output() toggleMobileLinks = new EventEmitter<void>();
  @Output() toggleLinksMenu = new EventEmitter<void>();
  @Output() openResume = new EventEmitter<void>();
  @Output() openGithub = new EventEmitter<void>();
  @Output() openLinkedin = new EventEmitter<void>();

  onNavigateToSection(section: string) {
    this.navigateToSection.emit(section);
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
    this.showLinksMenu = false;
    this.openResume.emit();
  }

  onOpenGithub() {
    this.showLinksMenu = false;
    this.openGithub.emit();
  }

  onOpenLinkedin() {
    this.showLinksMenu = false;
    this.openLinkedin.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('links-dropdown');
    const mobileDropdown = document.getElementById('mobile-links-dropdown');
    
    if (dropdown && !dropdown.contains(target)) {
      this.showLinksMenu = false;
    }
    
    if (mobileDropdown && !mobileDropdown.contains(target)) {
      this.mobileLinksOpen = false;
    }
  }
}