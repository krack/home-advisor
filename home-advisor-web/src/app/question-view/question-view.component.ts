import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Score } from '../model/score';
import { ElementComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { Question } from '../model/question';
import { QuestionsService } from '../questions.service';


@Component({
  selector: 'question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent extends ElementComponent<Question> implements OnInit{

  @Input() element: Question;
  @Input()  elements: Question[];

  constructor(service: QuestionsService, router:Router, route: ActivatedRoute) { 
    super("/questions/", service, router, route);
  }

  ngOnInit() {
      this.listOfElement =this.elements;

  }

}
