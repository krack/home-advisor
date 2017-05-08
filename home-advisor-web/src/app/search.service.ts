import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions }          from '@angular/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';

import { SearchResult } from './model/searchResult';
import { Address } from './model/address';

@Injectable()
export class SearchService {

  private url = environment.apiUrl+'search/';  // URL to web API

  private options:RequestOptions;
  constructor (private http: Http) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers, withCredentials: true });
  }



  private extractData(res: Response) {
    let body = res.json(); 
    return body || { };
  }
  private handleError (error: Response | any) {
    return Observable.throw(error.status);
  }

  search(adress:Address): Observable<SearchResult>{
  	
	     return this.http.post(this.url, adress, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
