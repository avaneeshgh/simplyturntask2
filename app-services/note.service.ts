import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from './dialog-service';
import { NotificationService } from './notification-service';

@Injectable({ providedIn: "root" })
export class NoteService implements OnInit {

  constructor(private http: HttpClient,
    private notification: NotificationService,
    private router: Router,
    private dialogservice: DialogService,
  ) { }

  ngOnInit() {

  }

  getNoteBydD(noteObj: any) {

    return this.http.post<{ message: string, noteDetails: any }>('/notes/getNoteById', noteObj)

  }


  saveNote(noteObj: any) {
    this.http.post<{ message: string }>('/notes/saveNote', noteObj).subscribe(res => {

      if (res) {
        //message
        this.notification.success("Note Successfully Saved!");
      }
     })
  }


  editNote(noteObj) {

    //noteId,newNoteName,newNoteDescription,userId
    this.http.put<{ message: string }>('/notes/editNote', noteObj).subscribe(res => {
      if (res) {
        //message
        this.notification.success("Note Successfully Edited!");
      }
     })
  }


  deleteNote(noteObj) {

    //noteId,userId
    this.http.post<{ message: string }>('/notes/deleteNote', noteObj).subscribe(res => {
      if (res) {
        //message
        this.notification.success("Note Successfully Deleted!");

        //routing
        this.router.navigateByUrl('studentdashboard');
      }
     })
  }

}
