import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectDetailModalComponent } from './components/modals/project-detail-modal.component';
import { EducationDetailModalComponent } from './components/modals/education-detail-modal.component';
import { WorkDetailModalComponent } from './components/modals/work-detail-modal.component';
import { InfoDetailModalComponent } from './components/modals/info-detail-modal.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ChatComponent } from './components/chat/chat.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectDetailModalComponent,
    EducationDetailModalComponent,
    WorkDetailModalComponent,
    InfoDetailModalComponent,
    SkillsComponent,
    ChatComponent,
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
