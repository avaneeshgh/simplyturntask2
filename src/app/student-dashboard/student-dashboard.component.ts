import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'app-services/dialog-service';
import { NoteService } from 'app-services/note.service';
import { NotificationService } from 'app-services/notification-service';
import { UserService } from 'app-services/user.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private userservice: UserService,
    private dialogservice: DialogService,
    private noteservice: NoteService,
    private router: Router,
    private route: ActivatedRoute,
  private notification:NotificationService) { }

  presentUser: any;
  presentUserNotes: any;
  presentUserId: any;


  isTeacher: boolean;
  isLoading: boolean = true;

  ngOnInit(): void {

    this.isLoading = true;
    this.userservice.getUserBasedOnToken().subscribe(res => {

      res.userDesignation == "teacher" ? this.isTeacher = true : this.isTeacher = false;
      })

    this.route.paramMap.subscribe(parammap => {
      this.presentUserId = parammap.get('studentId');

      let userObj={id:this.presentUserId};
      this.userservice.getUserDetails(userObj).subscribe(uresult => {
        this.presentUser = uresult.userDetails;

        this.afterGettingUser(this.presentUserId);
      })
    })

  }


  afterGettingUser(userId) {

    const userObj={id:userId};
    this.userservice.getAllNotesOfCurrentUser(userObj).subscribe(result => {

      //console.log(result.userAllNotes);
      this.presentUserNotes = result.userAllNotes;
      this.isLoading = false;
    })
  }

  onViewNote(noteId)
  {
    this.router.navigateByUrl('/viewnote/'+noteId);
  }

  onCreateNote()
  {
    this.dialogservice.openUserInfoDialog().afterClosed().subscribe(res => {
      this.noteservice.saveNote(res.value).subscribe(res => {

        //message
        this.notification.success("Note Successfully Saved!");
        this.afterGettingUser(res.noteDetails.userId);

     })
    }, err => {

      })
  }

  onBackButtonToTeacher()
  {
    this.router.navigateByUrl('teacherdashboard');
  }



}
