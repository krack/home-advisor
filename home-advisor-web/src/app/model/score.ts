import { File } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import {Address} from './address';


export class Score implements IdentifiedElement{
	public address: Address;
	constructor(public _id: string, public rate?: number, public rater?: String){
		this.address = new Address();
	}

}