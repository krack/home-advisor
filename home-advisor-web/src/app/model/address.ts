import { File } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';
import { IdentifiedElement } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

export class Address{

	constructor(public country?:string, public street_number?:Number, public route?:string, public streetComplement?:string, public locality?:string, public postal_code?:string){
	}
}