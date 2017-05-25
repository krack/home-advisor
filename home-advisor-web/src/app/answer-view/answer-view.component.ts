import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../model/question';
import { Proposal } from '../model/proposal';

@Component({
  selector: 'answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.scss']
})
export class AnswerViewComponent implements OnInit {
	@Input() question: Question; 
  constructor() { }

  ngOnInit() {
  }


}
