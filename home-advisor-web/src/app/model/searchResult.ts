import { File } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import {SearchElement} from './searchElement';


export class SearchResult {
	public match: SearchElement[];
	public route: SearchElement[];
	constructor(){
		this.match = [];
		this.route = [];
	}

}