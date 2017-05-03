import { File } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

export class Score implements IdentifiedElement{

	constructor(public _id: string, public adress?: String, public rate?: number, public rater?: String){
	}

}