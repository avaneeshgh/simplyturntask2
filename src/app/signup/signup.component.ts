import { Component, OnInit } from '@angular/core';
import { UserService } from 'app-services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  constructor(private userservice:UserService) { }

  emailState: boolean;
  verifyPassword: boolean;

  classes = [{ label:"First", value:"1" },
    { label:"Second", value:"2" },
    { label:"Third", value:"3" },
    { label:"Fourth", value:"4" },
    { label:"Fifth", value:"5" },
    { label:"Sixth", value:"6" },
    { label:"Seventh", value:"7" },
    { label:"Eight", value:"8" },
    { label:"Ninth", value:"9" },
    { label:"Tenth", value:"10" },
  ]

  ngOnInit(): void {
  }


  onSubmit(form)
  {
    let userObj = {

      name: form.name,
      rollNo:form.rollNo,
      password:form.password,
      email:form.email,
      class: form.class.value,
      address: form.address,
      phoneNo: form.phone,
      gender: form.gender,
      designation:"student"
    };

    this.userservice.signup(userObj);

  }

  validateEmail(checkEmail) {
    this.emailState =
      checkEmail.endsWith("@gmail.com") ||
      checkEmail.endsWith("@yahoo.com") ||
      checkEmail.endsWith("@outlook.com");
    // console.log(this.emailState);
  }

  validatePassword(password, confirmPassword) {
    if (password === confirmPassword && password !== "") {
      this.verifyPassword = true;
    } else {
      this.verifyPassword = false;
    }
  }

}
