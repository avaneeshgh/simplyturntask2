import { ScannerComponent } from './scanner/scanner.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { ParticularNoteComponent } from './particular-note/particular-note.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usersignup', component: SignupComponent },
  { path: 'studentdashboard/:studentId', component: StudentDashboardComponent },
  { path: 'teacherdashboard', component: TeacherDashboardComponent },
  { path: 'viewnote/:noteId', component: ParticularNoteComponent },
  { path: 'scanner', component: ScannerComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
