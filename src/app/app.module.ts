import { AuthInterceptor } from './../../app-services/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

//primeng
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';

//Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './errors/error/error.component';
import { ErrorInterceptor } from 'error-interceptor';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { ParticularNoteComponent } from './particular-note/particular-note.component';
import { CreatenotemodalComponent } from './createnotemodal/createnotemodal.component';
import { MainfooterComponent } from './mainfooter/mainfooter.component';
import { ScannerComponent } from './scanner/scanner.component';
import { NgQrScannerModule } from 'angular2-qrscanner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    MainNavComponent,
    ConfirmDialogComponent,
    ErrorComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    ParticularNoteComponent,
    CreatenotemodalComponent,
    MainfooterComponent,
    ScannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgQrScannerModule,
    //primeng
    InputTextModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    EditorModule,
    //material
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatRadioModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
