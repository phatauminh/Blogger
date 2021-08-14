import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-advanced-search-dialog',
  templateUrl: './advanced-search-dialog.component.html',
  styleUrls: ['./advanced-search-dialog.component.css']
})
export class AdvancedSearchDialogComponent {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectCategories: string[] =
    [
      'Lemon'
    ];

  allCategories: string[] = [
    'Apple',
    'Banana',
    'Strawberry',
    'Orange',
    'Kiwi',
    'Cherry'
  ];

  constructor(
    public dialogRef: MatDialogRef<AdvancedSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListCategoryData) {
  }

  remove(category: string): void {
    const index = this.selectCategories.indexOf(category);

    if (index >= 0) {
      this.selectCategories.splice(index, 1);
      this.allCategories.push(category);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    debugger
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

export interface ListCategoryData {
  listCategory: {};
}
