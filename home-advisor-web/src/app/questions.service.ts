import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';

import { Question } from './model/question';
import { CrudService } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

@Injectable()
export class QuestionsService extends CrudService<Question>{

  constructor (http: Http) {
    super(environment.apiUrl+'questions/', http);
  }
}
