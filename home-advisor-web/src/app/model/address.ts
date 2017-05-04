import { File } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

export class Address{

	constructor(public country?:string, public street?:string, public streetComplement?:string, public city?:string, public postalCode?:string, public state?:string){
	}
}