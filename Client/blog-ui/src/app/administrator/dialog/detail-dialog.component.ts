import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'detail-dialog',
    templateUrl: './detail-dialog.html',
    styleUrls: ['./detail-dialog.css']
})
export class DetailDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DetailData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

export interface DetailData {
    name: string;
}