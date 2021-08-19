import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsVm, ItemListClient, ItemClient, ItemDto, ItemsInCategoryDto } from '../../services/api-administrator/item.service'
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponent } from '../../administrator/dialog/detail-dialog/detail-dialog.component';
import { UpdateItemDialogComponent } from '../../administrator/dialog/update-item-dialog/update-item-dialog.component';
import { DeleteItemDialogComponent } from '../../administrator/dialog/delete-item-dialog/delete-item-dialog.component';
import { CreateItemDialogComponent } from '../../administrator/dialog/create-item-dialog/create-item-dialog.component';
import { AdvancedSearchDialogComponent } from '../../administrator/dialog/advanced-search-dialog/advanced-search-dialog.component';
import * as XLSX from 'xlsx';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashBoardComponent implements OnInit {
  vm: ItemsVm | any;
  selectedList: ItemsInCategoryDto | any;
  selectedItem: ItemDto | any;
  animal: string | any;
  name: string | any;
  selection = new SelectionModel<ItemsInCategoryDto>(true, []);

  displayedColumns: string[] = ['select', 'category', 'name', 'action'];
  _listsClient: ItemListClient
  selectedCategories: Category[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private listsClient: ItemListClient, private itemsClient: ItemClient, public dialog: MatDialog) {
    this._listsClient = listsClient;
  }

  ngOnInit(): void {
    this._listsClient.get().subscribe(
      result => {
        this.vm = result;
        if (this.vm.listItem.length) {
          var allItems: ItemDto[] = [];

          for (var categoryIndex in this.vm.listItem) {
            for (var itemIdex in this.vm.listItem[categoryIndex].items) {
              allItems.push(this.vm.listItem[categoryIndex].items[itemIdex])
            }
          }

          this.selectedList = new MatTableDataSource<ItemsInCategoryDto>(allItems);
          this.selectedList.sort = this.sort;
          this.selectedList.filterPredicate = function (data: any, filter: string): boolean {
            return data.name.toLowerCase().includes(filter);
          };
          this.selectedList.paginator = this.paginator;
          allItems = [];
        }
      },
      error => console.error(error)
    );
  }

  openCreateItemDialog() {
    const dialogRef = this.dialog.open(CreateItemDialogComponent, {
      data:
      {
        name: "",
        categoryId: 3,
      }
    });

    dialogRef.afterClosed().subscribe(createdItem => {
      if (createdItem == "" || createdItem.name == "")
        return;
      this.itemsClient.create(createdItem).subscribe(
        (id) => {
          if (id != 0) {
            debugger;
            var newItem = new ItemDto();
            newItem.id = id;
            newItem.name = createdItem.name;
            newItem.categoryId = createdItem.categoryId;

            this.selectedList.data.push(newItem);
            this.selectedList.data = [...this.selectedList.data];
          }
        },
        error => console.error(error)
      );
    });
  }

  openDetailDialog(item: ItemDto) {
    this.dialog.open(DetailDialogComponent, {
      data:
      {
        name: item.name
      }
    });
  }

  openUpdateItemDialog(item: ItemDto) {
    const dialogRef = this.dialog.open(UpdateItemDialogComponent, {
      data:
      {
        id: item.id,
        name: item.name,
        imageString: item.imageString
      }
    });

    dialogRef.afterClosed().subscribe(updatedItem => {

      if (updatedItem == "")
        return;

      var shouldUpdateItem = false;
      if (updatedItem.name !== item.name) {
        shouldUpdateItem = true;
      }

      if (shouldUpdateItem) {
        if (item.id == 0) {
          let itemIndex = this.selectedList.indexOf(this.selectedItem);
          this.selectedList.data.splice(itemIndex, 1);
        } else {
          this.itemsClient.update(item.id!, updatedItem).subscribe(
            () => {
              item.name = updatedItem.name
            },
            error => console.error(error)
          );
        }
      }
    });
  }

  openDeleteItemDialog(item: ItemDto) {
    const dialogRef = this.dialog.open(DeleteItemDialogComponent, {
      data:
      {
        id: item.id,
        name: item.name,
        imageString: item.imageString
      }
    });

    dialogRef.afterClosed().subscribe(comfirmText => {
      if (comfirmText != "Confirmed")
        return;

      if (item.id == 0) {
        let itemIndex = this.selectedList.indexOf(this.selectedItem);
        this.selectedList.data.splice(itemIndex, 1);
      } else {
        this.itemsClient.delete(item.id as number).subscribe(
          () => {
            this.selectedList.data = this.selectedList.data.filter((t: any) => t.id != item.id);
          },
          error => console.error(error)
        );
      }
    });
  }

  openAdvancedSearchDialog() {

    var selectedCategories: Category[] = [];
    var allCategories: Category[] = [];


    this.vm.listItem.forEach((element: any) => {
      allCategories.push(new Category(element.id, element.name));
    });

    const dialogRef = this.dialog.open(AdvancedSearchDialogComponent, {
      data:
      {
        allCategories: allCategories,
        selectedCategories: selectedCategories
      }
    });

    dialogRef.afterClosed().subscribe(selectedCategories => {
      this.selectedCategories = selectedCategories;
      var allItems: ItemDto[] = [];

      // this.selectedCategories.forEach((element: any) => {
      //   for (var itemIdex in this.vm.listItem[element.id].items) {
      //     allItems.push(this.vm.listItem[element.id].items[itemIdex])
      //   }
      // })

      this.selectedList.data = allItems;
      allItems = [];
    });
  }

  isAllSelected() {
    return this.selection.selected.length > 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.selectRows();
  }
  pageChanged(event: any) {
    this.selection.clear();
  }
  selectRows() {

    const intIndex = this.selectedList.paginator.pageIndex === 0 ? 0 : (this.selectedList.paginator.pageSize * this.selectedList.paginator.pageIndex);
    let intPageSize = intIndex + this.selectedList.paginator.pageSize;
    if (intPageSize > this.selectedList.filteredData.length) {
      intPageSize = this.selectedList.filteredData.length;
    }
    for (let index = intIndex; index < intPageSize; index++) {
      this.selection.select(this.selectedList.filteredData[index]);
    }
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

    if (this.selectedList.paginator) {
      this.selectedList.paginator.firstPage();
    }
  }

  exportExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.selectedList.data, { header: ['id', 'name', 'action'] });
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Records');
    XLSX.writeFile(workBook, 'records.xlsx');
  }
}

export class Category {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

