import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from './dialog-service';
import { NotificationService } from './notification-service';

@Injectable({ providedIn: "root" })
export class UserService implements OnInit {

  constructor(private http: HttpClient,
    private notification: NotificationService,
    private router: Router,
    private dialogservice: DialogService,
  ) { }

  ngOnInit() {

  }

  private _registerUrl = "/users/usersignup";
  private _loginUrl = "/users/login";

  presentUser: any;
  presentDesignation: string;

  loggedIn = false;
  token: string;

  //listener for authentication
  public userObjSubject = new Subject<{name:string,email:string,password:string,phoneNo:string,designation:string,gender:string,class:string,address:string,_id:string}>();
  public loggedInSubject = new Subject<boolean>();

  getLoggedInListener() {
    return this.loggedInSubject.asObservable();
  }

  getuserDetailsSubjectListener() {
    return this.userObjSubject.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.loggedIn;
  }

  login(userloginObj) {
    this.http.post<{ message: string, signedToken: string, userObj: any }>(this._loginUrl, userloginObj).subscribe(res => {

      //message
      this.notification.success("Login Successful!");

      //save token
      localStorage.setItem("Token", res.signedToken);

      //save in present User
      this.token = res.signedToken;
      this.presentUser = res.userObj;
      this.presentDesignation = res.userObj.designation;

      //Notification
      this.loggedInSubject.next(true);
      this.userObjSubject.next(this.presentUser);

      //AppRoutingModule
      if (res.userObj.designation == "teacher") {

        this.router.navigateByUrl('teacherdashboard');
      }
      else {
        this.router.navigateByUrl('studentdashboard/' + this.presentUser._id);
      }

    })
  }




  signup(userObj) {
    this.http.post(this._registerUrl, userObj).subscribe(res => {

      if (res) {
        //message
        this.notification.success("SuccessFul Registration..Please Login");
      }
      //router
      this.router.navigate(['login']);

    }
    )
  }


  logOut() {
    this.dialogservice
      .openConfirmDialog("Do You Want to Logout?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.clearCacheAndRedirect();
          this.notification.success(
            "Thank You for visitinng our website!"
          );
        }
      });

  }

  clearCacheAndRedirect() {
    localStorage.removeItem("Token");

    this.loggedIn = false;
    this.token = null;
    this.presentUser = null;
    this.presentDesignation = null;

    this.loggedInSubject.next(false);
    this.userObjSubject.next(null);

    this.router.navigateByUrl("/home");
  }


  //getAllNotesOfCurrentUserBasedOnID
  getAllNotesOfCurrentUser(userObj)
  {
    const url = '/notes/allNotes';
    return this.http.post<{ message: string, userAllNotes: any }>(url, userObj);
  }


  getUserDetails(userObj){
    return this.http.post<{ message: string, userDetails: any }>('/users/getUserDetails',userObj);
  }

  getAllUsers() {
    return this.http.post<{ message: string, usersDetails: any }>('/users/getAllUsers', {});
  }


  getUserBasedOnToken()
  {
    return this.http.post<{ message: string, userDesignation:string,userDetails:any }>('/users/getUserBasedOnToken', {});
  }



}


