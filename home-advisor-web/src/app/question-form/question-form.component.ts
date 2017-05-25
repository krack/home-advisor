import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ElementComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { FileUploader, FileSelectDirective} from 'ng2-file-upload'


import { Question } from '../model/question';
import { Proposal } from '../model/proposal';

import { QuestionsService } from '../questions.service';

import {environment} from '../../environments/environment';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  providers:[QuestionsService]
})
export class QuestionFormComponent extends ElementComponent<Question>  implements OnInit {
	public newProposal:Proposal;
	 types = [
	 	"score",
	 	"choice",
	 	"multi-choice"
     ];

	constructor( router: Router, route: ActivatedRoute, scoresService: QuestionsService) {
		super("/question/", scoresService, router, route);
		this.element = new Question(undefined);
		this.newProposal = new Proposal();
	}

	ngOnInit() {
		this.initElementFromUrlParameter().subscribe(() => {
		});
	}
	addProposal(){
		this.element.proposals.push(this.newProposal);
		this.newProposal = new Proposal();
	}
	removeProposal(value:string){
		let index: number = this.element.proposals.indexOf(value);
	    if (index !== -1) {
	        this.element.proposals.splice(index, 1);
	    }    
	}
}
