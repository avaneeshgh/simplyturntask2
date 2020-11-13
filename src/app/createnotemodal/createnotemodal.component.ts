import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-createnotemodal',
  templateUrl: './createnotemodal.component.html',
  styleUrls: ['./createnotemodal.component.scss']
})
export class CreatenotemodalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreatenotemodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit(): void {
  }

  onCloseDialog() {
    this.dialogRef.close(null);
  }

}
