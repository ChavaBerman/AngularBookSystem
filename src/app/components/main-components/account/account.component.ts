import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentuser: JSON;

  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.userservice.subjectUser.subscribe(
      {
        next: (v: JSON) => this.currentuser = v
      }
    );
    //if subject didnt get value i need to take value from local storage 
    if (localStorage['currentuser'])
      this.currentuser = JSON.parse(localStorage.getItem('currentuser'));
  }
  logOut() {
    //log out the user
    this.userservice.logout();
  }
}
