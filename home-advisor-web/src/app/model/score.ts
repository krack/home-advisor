import { File } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import {Address} from './address';
import {Question} from './question';


export class Score implements IdentifiedElement{
	public address: Address;
	public answers: Question[];
	constructor(public _id: string, public rate?: number, public rater?: String){
		this.address = new Address();
		this.answers = [];
	}

}