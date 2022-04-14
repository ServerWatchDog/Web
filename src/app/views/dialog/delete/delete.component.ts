import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  checked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }


}
