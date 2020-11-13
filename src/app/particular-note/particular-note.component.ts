import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'app-services/dialog-service';
import { NoteService } from 'app-services/note.service';
import { UserService } from 'app-services/user.service';


@Component({
  selector: 'app-particular-note',
  templateUrl: './particular-note.component.html',
  styleUrls: ['./particular-note.component.scss']
})
export class ParticularNoteComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private noteservice: NoteService,
    private userservice: UserService,
    private dialogservice: DialogService,
    private router: Router) { }
  presentNote: any;
  presentNoteId: string;


  isEditorDisplay: boolean = false;
  newNoteName: string;
  newNoteDescription: string;

  isTeacher: boolean;
  ngOnInit(): void {

    this.userservice.getUserBasedOnToken().subscribe(res => {
      res.userDesignation == "teacher" ? this.isTeacher = true : this.isTeacher = false;
    })
    this.route.paramMap.subscribe(res => {
      this.presentNoteId = res.get('noteId');
      this.afterGettingNoteId();
    })
  }

  afterGettingNoteId() {
    let noteObj = {
      id: this.presentNoteId
    }
    this.noteservice.getNoteBydD(noteObj).subscribe(result => {
      //initialization
      this.presentNote = result.noteDetails;
      this.newNoteDescription = result.noteDetails.noteDescription;
      this.newNoteName = result.noteDetails.noteName;

    })
  }

  onEdit() {
    this.isEditorDisplay = true;
  }

  onDelete() {
    this.dialogservice.openConfirmDialog('Do you wish to continue..').afterClosed().subscribe(res => {
      if (res)
      {
         //noteId,userId
        let noteObj = {
          noteId: this.presentNoteId,
          userId: this.presentNote.userId
        };

        console.log(noteObj);
        this.noteservice.deleteNote(noteObj);

        this.isEditorDisplay = false;
      }
     })
  }


  onUpdate() {
    this.dialogservice.openConfirmDialog('Do you wish to continue..').afterClosed().subscribe(res => {
      if (res)
      {
         //noteId,newNoteName,newNoteDescription,userId
        let noteObj = {
          noteId: this.presentNoteId,
          newNoteName: this.newNoteName,
          newNoteDescription: this.newNoteDescription,
          userId: this.presentNote.userId
        };

        this.noteservice.editNote(noteObj);
      }
     })

  }

  onBackButton() {

    //teaacher or student
    this.router.navigateByUrl('/studentdashboard/'+this.presentNote.userId);
  }

}
