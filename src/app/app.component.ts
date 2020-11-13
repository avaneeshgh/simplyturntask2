import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { UserService } from 'app-services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SimplyturnTask2';
  constructor(private userservice: UserService) { }

  ngOnInit() {

    if (localStorage.getItem('Token') !== null && localStorage.getItem('Token') !== undefined) {
      this.userservice.getLoggedInListener();
      //this.userservice.getuserDetailsSubjectListener();
      this.userservice.getUserBasedOnToken().subscribe(res => {
        if (res) {
          this.userservice.loggedInSubject.next(true);
          //this.userservice.userObjSubject.next(res.userDetails);
        }
      })



    }
  }
}
