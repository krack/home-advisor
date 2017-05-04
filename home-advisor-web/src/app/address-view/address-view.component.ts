import { Component, OnInit, Input } from '@angular/core';
import {Address} from "../model/address";

@Component({
  selector: 'address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {
	@Input() address: Address;
	constructor() { }

	ngOnInit() {
		if(!this.address){
			this.address = new Address();
		}
	}

}
