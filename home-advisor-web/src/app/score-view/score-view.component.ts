import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ElementComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { FileUploader, FileSelectDirective} from 'ng2-file-upload'


import { Score } from '../model/score';
import { User } from '../model/user';
import { SearchResult } from '../model/searchResult';

import { ScoresService } from '../scores.service';
import { UserService } from '../users.service';
import { SearchService } from '../search.service';

import {environment} from '../../environments/environment';


@Component({
	moduleId: module.id,
	selector: 'score-view',
	templateUrl: './score-view.component.html',
	styleUrls: ['./score-view.component.scss'],
	providers: [ScoresService, UserService, SearchService],

})
export class ScoreViewComponent extends ElementComponent<Score> implements OnInit {
	private usersService:UserService;
	private connectedUser:User;
  	public searchResult: SearchResult;


	constructor( router: Router, route: ActivatedRoute, scoresService: ScoresService, usersService: UserService, private searchService:SearchService,) {
		super("/score/", scoresService, router, route);
		this.usersService= usersService;
		this.element = new Score(undefined);
		this.searchResult = new SearchResult();
	}

	ngOnInit() {
		this.initElementFromUrlParameter().subscribe(
			nothing=>{
				this.searchService.search(this.element.address).subscribe(
		            result => {
		              this.searchResult = result;
		            },
		            error =>  this.manageError(error)
	          	);
			},
		    error =>  this.manageError(error)

		);
		this.usersService.getConnectedUser().subscribe(	(user: User) => {
			this.connectedUser = user;
		});
	};

		 
}
