import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';

import { Score } from './model/score';
import { CrudService } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

@Injectable()
export class ScoresService extends CrudService<Score>{

  constructor (http: Http) {
    super(environment.apiUrl+'scores/', http);
  }
}
