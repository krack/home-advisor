import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from "angular2-google-maps/core";


import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ScoresListComponent } from './scores-list/scores-list.component';
import { ScoreFormComponent } from './score-form/score-form.component';
import { ScoreViewComponent } from './score-view/score-view.component';
import { ScoreListElementComponent } from './scores-list-element/scores-list-element.component';
import { LoginComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { FilesUploaderComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { UsersListComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { UsersListElementComponent, AppSettings } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';


import {environment} from '../environments/environment';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressViewComponent } from './address-view/address-view.component';
import { AddressSearchComponent } from './address-search/address-search.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { AnswerViewComponent } from './answer-view/answer-view.component';
import { AnswerFormComponent } from './answer-form/answer-form.component';
import { IfAdministratorDirective } from './if-administrator.directive';


const appRoutes: Routes = [
  { path: 'score',      component: ScoreFormComponent },
  { path: 'score-detail/:id',      component: ScoreViewComponent }, 
  { path: 'score/:id',      component: ScoreFormComponent },
  { path: 'scores',  component: ScoresListComponent},
  { path: 'question',      component: QuestionFormComponent },
  { path: 'question/:id',      component: QuestionFormComponent },
  { path: 'questions',  component: QuestionsListComponent},
  { path: 'users',  component: UsersListComponent},
  {
    path: 'search',
    component: AddressSearchComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { baseUrl: environment.apiUrl.replace("/api/", "/") }
  },
  { path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ScoresListComponent,
    ScoreFormComponent,
    FileSelectDirective,
    ScoreListElementComponent,
    LoginComponent,
    FilesUploaderComponent,
    AddressFormComponent,
    AddressViewComponent,
    AddressSearchComponent,
    ScoreViewComponent,
    QuestionViewComponent,
    QuestionFormComponent,
    QuestionsListComponent,
    AnswerViewComponent,
    AnswerFormComponent,
    IfAdministratorDirective,
    UsersListComponent,
    UsersListElementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     RouterModule.forRoot(appRoutes),
     AgmCoreModule.forRoot({
      apiKey: "AIzaSyD0KAzKd0V5GYS7dMdf8aQq7xsIQp-LTZM",
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    AppSettings.API_ENDPOINT = environment.apiUrl;
  }
}
