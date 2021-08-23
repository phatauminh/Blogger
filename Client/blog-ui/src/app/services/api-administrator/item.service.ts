import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor() { }
}

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IItemListClient {
  get(): Observable<ItemsVm>
}

@Injectable({
  providedIn: 'root'
})
export class ItemListClient implements IItemListClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  get(): Observable<ItemsVm> {
    let url_ = this.baseUrl + "/api/Category";
    url_ = url_.replace(/[?&]$/, "");

    return (this.http.get<ItemsVm>(url_)).pipe(_observableMergeMap((response_: any) => {
      let result200: any = null;
      result200 = ItemsVm.fromJS(response_);
      return _observableOf(result200);
    }));
  }
}

export interface IItemClient {
  get(listCategory: number[]): Observable<ItemsVm>;
  create(command: CreateItemCommand): Observable<any>;
  update(id: number, command: UpdateItemCommand): Observable<any>;
  delete(id: number): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class ItemClient implements IItemClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  get(listCategory: number[]): Observable<ItemsVm> {
    let url_ = this.baseUrl + "/api/Item/GetItemByListCategory";
    url_ = url_.replace(/[?&]$/, "");
    let params = new HttpParams();

    listCategory.forEach((categoryId:number) =>{
      params = params.append(`ListCategory`, categoryId.toString());
    })

    return (this.http.get<ItemsVm>(url_, { params: params })).pipe(_observableMergeMap((response_: any) => {
      let result200: any = null;
      result200 = ItemsVm.fromJS(response_);
      return _observableOf(result200);
    }));
  }

  create(command: CreateItemCommand): Observable<any> {
    let url_ = this.baseUrl + "/api/Item";
    url_ = url_.replace(/[?&]$/, "");
    var item = this.http.post<ItemDto>(url_, command);

    return item;
  }

  update(id: number, command: UpdateItemCommand): Observable<any> {
    let url_ = this.baseUrl + `/api/Item/${id}`;
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");

    return this.http.put<ItemDto>(url_, command);
  }

  delete(id: number): Observable<any> {
    let url_ = this.baseUrl + `/api/Item/${id}`;
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");

    return this.http.delete(url_);
  }
}

export class ItemsVm implements IItemsVm {
  listItem?: ItemsInCategoryDto[] | undefined;

  constructor(data?: IItemsVm) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["itemsInCategory"])) {
        this.listItem = [] as any;
        for (let item of _data["itemsInCategory"])
          this.listItem!.push(ItemsInCategoryDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ItemsVm {
    data = typeof data === 'object' ? data : {};
    let result = new ItemsVm();
    result.init(data);
    return result;
  }
}

export interface IItemsVm {
  listItem?: ItemsInCategoryDto[] | undefined;
}

export class ItemsInCategoryDto implements IItemsInCategoryDto {
  id?: number;
  name?: string | undefined;
  items?: ItemDto[] | undefined;

  constructor(data?: IItemsInCategoryDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      if (Array.isArray(_data["items"])) {
        this.items = [] as any;
        for (let item of _data["items"])
          this.items!.push(ItemDto.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ItemsInCategoryDto {
    data = typeof data === 'object' ? data : {};
    let result = new ItemsInCategoryDto();
    result.init(data);
    return result;
  }
}

export interface IItemsInCategoryDto {
  id?: number;
  name?: string | undefined;
  items?: ItemDto[] | undefined;
}

export class ItemDto {
  id?: number;
  categoryId?: number;
  name?: string | undefined;
  imageString?: string | undefined;

  constructor(data?: IItemDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.categoryId = _data["categoryId"];
      this.name = _data["name"];
      this.imageString = _data["imageString"];
    }
  }

  static fromJS(data: any): ItemDto {
    data = typeof data === 'object' ? data : {};
    let result = new ItemDto();
    result.init(data);
    return result;
  }
}



export interface IItemDto {
  id?: number;
  categoryId?: number;
  name?: string | undefined;
  imageString?: string | undefined;
}


export class UpdateItemCommand {
  id?: number;
  name?: string | undefined;
  imageString?: string | undefined;
}

export class CreateItemCommand {
  id?: number;
  name?: string | undefined;
  imageString?: string | undefined;
}
