import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app-services/user.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  constructor(private userservice: UserService,
  private router: Router) { }

  allStudents: any;

  ngOnInit(): void {
    this.userservice.getAllUsers().subscribe(res => {
      this.allStudents = res.usersDetails;
      })
  }

  onViewStudent(userId)
  {
    this.router.navigateByUrl('studentdashboard/' + userId);
  }



}
