import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ScoresListComponent } from './scores-list/scores-list.component';
import { ScoreFormComponent } from './score-form/score-form.component';
import { ScoreListElementComponent } from './scores-list-element/scores-list-element.component';
import { LoginComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { FilesUploaderComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';


import {environment} from '../environments/environment';


const appRoutes: Routes = [
  { path: 'score',      component: ScoreFormComponent },
  { path: 'score/:id',      component: ScoreFormComponent },
  {
    path: 'scores',
    component: ScoresListComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { baseUrl: environment.apiUrl.replace("/api/", "/") }
  },
  { path: '',
    redirectTo: '/scores',
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
    FilesUploaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
