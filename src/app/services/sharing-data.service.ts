import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventemmiter:EventEmitter<User> = new EventEmitter();
  private _idUserEventEmmiter:EventEmitter<number> = new EventEmitter();

  constructor() { }

  get newUserEventemmiter():EventEmitter<User>{
    return this._newUserEventemmiter;
  }

  get idUserEventEmmiter():EventEmitter<number>{
    return this._idUserEventEmmiter;
  }


}
