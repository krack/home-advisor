import { Component , OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {ViewEncapsulation} from '@angular/core';
import { UserService } from './users.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss' ],
  providers:  [ UserService]
})
export class AppComponent implements OnInit {
	public connected:User;
	constructor(private usersService: UserService,private router: Router) { }

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
