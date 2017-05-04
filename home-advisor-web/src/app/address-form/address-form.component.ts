import { Component, OnInit, Input } from '@angular/core';
import {Address} from "../model/address";

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
	private countries : String[]; 
  @Input() address: Address;
  constructor() { 
  	this.countries = ['France'];
  }

  ngOnInit() {
  }

}
