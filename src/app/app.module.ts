/*
============================================
; Title: app.module
; Author: Richard Krasso
; Date: 01/06/2020
; Modified By:
; Description: App module
;===========================================
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatDialogModule,
  MatStepperModule,
  MatSnackBarModule,
  MatChipsModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import { SessionGuard } from './shared/guards/session.guard';
import { SessionService } from './shared/services/session.service';
import { CookieService } from 'ngx-cookie-service';
import { SecurityQuestionService } from './shared/services/security-question.service';
import { SecurityQuestionsListComponent } from './pages/admin/security-questions-list/security-questions-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SecurityQuestionCreateDialogComponent } from './dialogs/security-question-create-dialog/security-question-create-dialog.component';
import { SecurityQuestionEditDialogComponent } from './dialogs/security-question-edit-dialog/security-question-edit-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { UserDetailDialogComponent } from './dialogs/user-detail-dialog/user-detail-dialog.component';
import { UserRegistrationDialogComponent } from './dialogs/user-registration-dialog/user-registration-dialog.component';
import { ForgotPasswordDialogComponent } from './dialogs/forgot-password-dialog/forgot-password-dialog.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    SigninComponent,
    SecurityQuestionsListComponent,
    SecurityQuestionCreateDialogComponent,
    SecurityQuestionEditDialogComponent,
    ConfirmationDialogComponent,
    UserListComponent,
    UserDetailDialogComponent,
    UserRegistrationDialogComponent,
    ForgotPasswordDialogComponent,
    ServerErrorComponent,
    FooterComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled'
    }),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  providers: [
    SessionGuard,
    CookieService,
    SessionService,
    SecurityQuestionService
  ],
  entryComponents: [
    SecurityQuestionCreateDialogComponent,
    SecurityQuestionEditDialogComponent,
    ConfirmationDialogComponent,
    UserDetailDialogComponent,
    UserRegistrationDialogComponent,
    ForgotPasswordDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
