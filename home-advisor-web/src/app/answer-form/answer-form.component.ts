import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../model/question';

@Component({
  selector: 'answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {
	@Input() question: Question; 
  constructor() { }

  ngOnInit() {
  }

}
