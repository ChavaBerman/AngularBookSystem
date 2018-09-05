import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Jsonp } from '../../../../node_modules/@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentuser;
  constructor(private userservice: UserService) { 
    this.userservice.subjectUser.subscribe(
      {
        next: (v) => this.currentuser=v
      }
    );
    if(localStorage['currentuser'])
    this.currentuser=JSON.parse(localStorage.getItem('currentuser'));
  }

  ngOnInit() {

  }

}
