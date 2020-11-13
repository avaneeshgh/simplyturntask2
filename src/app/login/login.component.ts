import { Component, OnInit } from '@angular/core';
import { UserService } from 'app-services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userservice:UserService) { }

  isLoading: boolean;
    //password hiding in html
    hide = true;
  ngOnInit(): void {
  }

  onSubmit(form) {

    let userLoginObj = {
      rollNo: form.value.rollNo,
      password: form.value.password
    }

    this.userservice.login(userLoginObj);


  }

}
