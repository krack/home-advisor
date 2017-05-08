import { File } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import {Address} from './address';

export class SearchElement{

	constructor(public address:Address, public scoreId:string){
	}
}