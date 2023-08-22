import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutSectionComponent } from '../shared/components/about-section/about-section.component';
import { ProjectComponent } from '../shared/components/project/project.component';
import { ContactComponent } from '../shared/components/contact/contact.component';

const routes: Routes = [
  { path: 'projects', component: ProjectComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutSectionComponent, pathMatch: 'full'},
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
