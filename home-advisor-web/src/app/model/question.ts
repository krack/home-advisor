import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

export class Question implements IdentifiedElement{
	constructor(public _id: string, public label?: String, public type?: String, public order?: Number, public value?: String){
	}

}