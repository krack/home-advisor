import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router} from '@angular/router';


import { ErrorComponent } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

import {SearchService } from '../search.service';
import {SearchResult} from '../model/searchResult';
import {Address} from '../model/address';


@Component({
  selector: 'address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.scss'],
  providers: [SearchService]
})
export class AddressSearchComponent extends ErrorComponent implements OnInit {
  private adressSearch:Address = new Address();
  public scores: SearchResult[] = [];
  public searchRun:boolean = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private searchService:SearchService,
    router:Router
  ) {
    super(router)
  }

  ngOnInit() {

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();          
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
       
          this.adressSearch.street_number = Number(this.searchAdressComponent(place.address_components, "street_number").long_name);
          this.adressSearch.route = this.searchAdressComponent(place.address_components, "route").long_name;
          this.adressSearch.locality = this.searchAdressComponent(place.address_components, "locality").long_name;
          this.adressSearch.postal_code = this.searchAdressComponent(place.address_components, "postal_code").long_name;
          this.adressSearch.country = this.searchAdressComponent(place.address_components, "country").long_name;
          this.searchService.search(this.adressSearch).subscribe(
            result => {
              this.scores = result;
              this.searchRun = true;
            },
            error =>  this.manageError(error)
          );
        });
      });
    });
  }

  private searchAdressComponent(addressComponents:google.maps.GeocoderAddressComponent[], type:string):google.maps.GeocoderAddressComponent {
    for(var component of addressComponents){
      if(component.types.indexOf(type)!==-1){
        return component;

      }
    }
    return null;
  }
}