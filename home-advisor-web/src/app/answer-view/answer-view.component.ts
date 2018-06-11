import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../model/question';
import { Proposal } from '../model/proposal';


import * as _ from 'lodash-es';

@Component({
  selector: 'answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.scss']
})
export class AnswerViewComponent implements OnInit {
  @Input() question: Question;
  private proposal: String;
  constructor() { }

  ngOnInit() {
    if (this.question.questionType === 'choice') {
      this.proposal = _.find(this.question.proposals, { '_id': this.question.value });
    }
  }


}
