import { Component , OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {ViewEncapsulation} from '@angular/core';
import { User, UsersService } from 'angularjs-nodejs-framework/angularjs-nodejs-framework';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss' ],
  providers:  [ UsersService]
})
export class AppComponent implements OnInit {
	public connected:User;
	constructor(private usersService: UsersService,private router: Router) { }

  ngOnInit() {
     var url = localStorage['last-url-error'];
     if(url){
       this.router.navigateByUrl(url); 
       localStorage.removeItem('last-url-error');
     }
       this.usersService.getConnectedUser().subscribe(
       	  user=> this.connected = user
        );
  }
}
