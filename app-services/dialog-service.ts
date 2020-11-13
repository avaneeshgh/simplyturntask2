import { CreatenotemodalComponent } from "./../src/app/createnotemodal/createnotemodal.component";

import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/confirm-dialog/confirm-dialog.component";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(msg: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "390px",
      panelClass: "confirm-dialog-container",
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }

  openUserInfoDialog() {
    return this.dialog.open(CreatenotemodalComponent, {
      width: "800px",
      panelClass: "confirm-dialog-container",
      disableClose: true,
    });
  }

}
