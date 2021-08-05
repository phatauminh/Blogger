
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-item-dialog',
  templateUrl: './delete-item-dialog.component.html',
  styleUrls: ['./delete-item-dialog.component.css']
})
export class DeleteItemDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<DeleteItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteItemData) { }
}

export interface DeleteItemData {
  id: number;
  name: string;
  confirmedText: string;
}
