import { Component, OnInit } from '@angular/core';
import { ListElements } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { Router } from '@angular/router';

import { QuestionsService } from '../questions.service';
import { Question } from '../model/question';

@Component({
  selector: 'questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  providers:  [QuestionsService]
})
export class QuestionsListComponent  extends ListElements<Question> {

   constructor (questionsService: QuestionsService, router:Router) {
    super(questionsService, router);
  }

}
