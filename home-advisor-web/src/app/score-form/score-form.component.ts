import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ElementComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { FileUploader, FileSelectDirective} from 'ng2-file-upload'


import { Score } from '../model/score';
import { Question } from '../model/question';
import { User } from '../model/user';

import { ScoresService } from '../scores.service';
import { UserService } from '../users.service';
import { QuestionsService } from '../questions.service';

import {environment} from '../../environments/environment';


@Component({
	moduleId: module.id,
	selector: 'score-form',
	templateUrl: './score-form.component.html',
	styleUrls: ['./score-form.component.scss'],
	providers: [ScoresService, UserService, QuestionsService]

})
export class ScoreFormComponent extends ElementComponent<Score> implements OnInit {
	private usersService:UserService;
	private connectedUser:User;
	private questions:Question[];


	constructor( router: Router, route: ActivatedRoute, scoresService: ScoresService, usersService: UserService, private questionsService: QuestionsService) {
		super("/score/", scoresService, router, route);
		this.usersService= usersService;
		this.element = new Score(undefined);
		this.questions = [];
	}

	ngOnInit() {
		
		this.initElementFromUrlParameter().subscribe(() => {
			/*this.questionsService.getAlls().subscribe(
			questions=>{
				this.element.answers = questions;
			});*/
		});
		this.usersService.getConnectedUser().subscribe(	(user: User) => {
			if(user){
				this.connectedUser = user;
				this.element.rater = this.connectedUser._id;
			}
		}, 
		(error)=>this.manageError(error));

		//field element with entry parameters
		this.route.params
    	.subscribe((params: Params) =>{
    		if(!params['id']){
	    		this.element.address.street_number = params['street_number'];
	    		this.element.address.route = params['route'];
	    		this.element.address.locality = params['locality'];
	    		this.element.address.postal_code = params['postal_code'];
	    		this.element.address.country = params['country'];
		    	this.questionsService.getAlls().subscribe(
					questions=>{
						this.element.answers = questions;
					}
				);
	    	}
    	});
	}
}
