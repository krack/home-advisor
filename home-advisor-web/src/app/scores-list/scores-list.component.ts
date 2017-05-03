import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ListElements } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { Score } from '../model/score';
import { ScoresService } from '../scores.service';

@Component({
  selector: 'scores-list',
  templateUrl: './scores-list.component.html',
  styleUrls: ['./scores-list.component.scss'],
  providers:  [ScoresService]
})
export class ScoresListComponent  extends ListElements<Score> {

  constructor (scoresService: ScoresService, router:Router) {
    super(scoresService, router);
  }

}
