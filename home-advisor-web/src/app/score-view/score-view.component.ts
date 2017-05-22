import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ElementComponent, User, UsersService } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { FileUploader, FileSelectDirective} from 'ng2-file-upload'


import { Score } from '../model/score';
import { SearchResult } from '../model/searchResult';

import { ScoresService } from '../scores.service';
import { SearchService } from '../search.service';

import {environment} from '../../environments/environment';


@Component({
	moduleId: module.id,
	selector: 'score-view',
	templateUrl: './score-view.component.html',
	styleUrls: ['./score-view.component.scss'],
	providers: [ScoresService, UsersService, SearchService],

})
export class ScoreViewComponent extends ElementComponent<Score> implements OnInit {
	private usersService:UsersService;
	private connectedUser:User;
  	public searchResult: SearchResult;


	constructor( router: Router, route: ActivatedRoute, scoresService: ScoresService, usersService: UsersService, private searchService:SearchService,) {
		super("/score/", scoresService, router, route);
		this.usersService= usersService;
		this.element = new Score(undefined);
		this.searchResult = new SearchResult();
	}

	ngOnInit() {
		this.initElementFromUrlParameter().subscribe(
			nothing=>{
				this.usersService.getById(this.element.rater).subscribe(	(user: User) => {
					this.connectedUser = user;
				});
				
				this.searchService.search(this.element.address).subscribe(
		            result => {
		              this.searchResult = result;
		            },
		            error =>  this.manageError(error)
	          	);
			},
		    error =>  this.manageError(error)

		);

	};

		 
}
