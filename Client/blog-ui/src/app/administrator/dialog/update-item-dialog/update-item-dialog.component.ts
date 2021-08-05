import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-item-dialog',
  templateUrl: './update-item-dialog.component.html',
  styleUrls: ['./update-item-dialog.component.css']
})
export class UpdateItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateItemData) { }
}

export interface UpdateItemData {
  id: number;
  name: string;
  imageString: string;
}
