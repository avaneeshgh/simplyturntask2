import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'app-services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public userservice: UserService,
  private router:Router) { }

  loggedIn: boolean;
  presentUserId;
  isTeacher: boolean=false;

  ngOnInit()
  {
    this.userservice.getLoggedInListener().subscribe(res => {
      this.loggedIn = res;
    })

    this.userservice.getuserDetailsSubjectListener().subscribe(res => {


      console.log(res);
      if (res.designation == "teacher")
      {
        this.isTeacher = true;
      }
      else
      {
        this.presentUserId = res._id;
        }

    })
  }

  onDashBoardClick()
  {
    console.log(this.isTeacher);
    if (this.isTeacher==true) {

      console.log('teacher dashboard');
      this.router.navigateByUrl('teacherdashboard');
    }
    else {

      this.router.navigateByUrl(`studentdashboard/${this.presentUserId}`);
    }
  }

}
