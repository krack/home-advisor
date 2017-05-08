import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ElementComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { FileUploader, FileSelectDirective} from 'ng2-file-upload'


import { Score } from '../model/score';
import { User } from '../model/user';

import { ScoresService } from '../scores.service';
import { UserService } from '../users.service';

import {environment} from '../../environments/environment';


@Component({
	moduleId: module.id,
	selector: 'score-form',
	templateUrl: './score-form.component.html',
	styleUrls: ['./score-form.component.scss'],
	providers: [ScoresService, UserService],

})
export class ScoreFormComponent extends ElementComponent<Score> implements OnInit {
	private usersService:UserService;
	private edit:boolean;


	constructor( router: Router, route: ActivatedRoute, scoresService: ScoresService, usersService: UserService) {
		super("/score/", scoresService, router, route);
		this.usersService= usersService;
		this.element = new Score(undefined);
	}

	ngOnInit() {
		this.initElementFromUrlParameter();
		this.usersService.getConnectedUser().subscribe(	(user: User) => this.element.rater = user._id);

		//field element with entry parameters
		this.route.params
    	.subscribe((params: Params) =>{
    		if(!params['id']){
	    		this.element.address.street_number = params['street_number'];
	    		this.element.address.route = params['route'];
	    		this.element.address.locality = params['locality'];
	    		this.element.address.postal_code = params['postal_code'];
	    		this.element.address.country = params['country'];
	    		this.edit = true;
	    	}else{
	    		this.edit = (params['edit'] === "true");
	    	}
    	});
	}
}
