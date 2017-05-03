import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Score } from '../model/score';
import { ElementComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { User } from '../model/user';
import { ScoresService } from '../scores.service';
import { UserService } from '../users.service';

import {environment} from '../../environments/environment';

const URL =  environment.apiUrl+'bets/';

@Component({
  selector: 'scores-list-element',
  templateUrl: './scores-list-element.component.html',
  styleUrls: ['./scores-list-element.component.scss'],
  providers:  [ScoresService, UserService]
})
export class ScoreListElementComponent extends ElementComponent<Score> implements OnInit {
  private usersService:UserService;	

  @Input() element: Score;
  @Input()  elements: Score[];

  public rater:User;
  private connected:User;

  constructor(service: ScoresService, usersService: UserService, router:Router, route: ActivatedRoute) { 
    super("/scores/", service, router, route);
    this.usersService = usersService;
    this.rater = new User(); 
    this.connected = new User();
  }

  ngOnInit() {
      this.listOfElement =this.elements;

      if(this.element.rater){
        this.usersService.getById(this.element.rater).subscribe((user: User) => this.rater = user);
      }
    
      this.usersService.getConnectedUser().subscribe((user: User)=> this.connected = user);

  }
}
