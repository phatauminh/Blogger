import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsVm, ItemListClient, ItemClient, ItemDto, ItemsInCategoryDto } from '../../services/api-administrator/item.service'
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponent } from '../../administrator/dialog/detail-dialog.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashBoardComponent {
  vm: ItemsVm | any;
  selectedList: ItemsInCategoryDto | any;
  selectedItem: ItemDto | any;
  animal: string | any;
  name: string | any;
  selection = new SelectionModel<ItemsInCategoryDto>(true, []);

  displayedColumns: string[] = ['select', 'id', 'name', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private listsClient: ItemListClient, private itemsClient: ItemClient, public dialog: MatDialog) {
    listsClient.get().subscribe(
      result => {
        this.vm = result;
        if (this.vm.listItem.length) {
          this.selectedList = new MatTableDataSource<ItemsInCategoryDto>(this.vm.listItem[0].items);
          this.selectedList.sort = this.sort;
          this.selectedList.filterPredicate = function (data: any, filter: string): boolean {
            return data.name.toLowerCase().includes(filter);
          };
          // this.selectedList.paginator = this.paginator;
        }
      },
      error => console.error(error)
    );
  }

  openDialog(item: ItemDto) {
    console.log(item)
    this.dialog.open(DetailDialogComponent, {
      data:
      {
        name: item.name
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.selectedList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.selectedList.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ItemsInCategoryDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id == null ? 0 : row.id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.selectedList.filter = filterValue.trim().toLowerCase();

    // if (this.selectedList.paginator) {
    //   this.selectedList.paginator.firstPage();
    // }
  }

  deleteItem(item: ItemDto) {
    debugger
    if (item.id == 0) {
      let itemIndex = this.selectedList.indexOf(this.selectedItem);
      this.selectedList.data.splice(itemIndex, 1);
    } else {
      this.itemsClient.delete(item.id as number).subscribe(
        (result) => {
          debugger
          console.log(result)
          this.selectedList.data = this.selectedList.data.filter((t: any) => t.id != item.id);
        },
        error => console.error(error)
      );
    }
  }
}
