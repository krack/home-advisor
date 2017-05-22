import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Score } from '../model/score';
import { ElementComponent, User, UsersService } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { ScoresService } from '../scores.service';


@Component({
  selector: 'scores-list-element',
  templateUrl: './scores-list-element.component.html',
  styleUrls: ['./scores-list-element.component.scss'],
  providers:  [ScoresService, UsersService]
})
export class ScoreListElementComponent extends ElementComponent<Score> implements OnInit {
  private usersService:UsersService;	

  @Input() element: Score;
  @Input()  elements: Score[];

  public rater:User;
  private connected:User;

  constructor(service: ScoresService, usersService: UsersService, router:Router, route: ActivatedRoute) { 
    super("/scores/", service, router, route);
    this.usersService = usersService;
    this.rater = new User(null); 
    this.connected = new User(null);
  }

  ngOnInit() {
      this.listOfElement =this.elements;

      if(this.element.rater){
        this.usersService.getById(this.element.rater).subscribe((user: User) => this.rater = user);
      }
    
      this.usersService.getConnectedUser().subscribe((user: User)=> this.connected = user);

  }
}
