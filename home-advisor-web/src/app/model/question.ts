import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import { Proposal } from './proposal';


export class Question implements IdentifiedElement{
	public proposals:Proposal[];
	constructor(public _id: string, public label?: String, public questionType?: String, public order?: Number, public value?: String){
		this.proposals = [];
	}

}