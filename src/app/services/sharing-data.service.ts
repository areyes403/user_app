import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventemmiter:EventEmitter<User> = new EventEmitter();
  private _idUserEventEmmiter:EventEmitter<number> = new EventEmitter();
  private _findUserByIdEventEmmiter = new EventEmitter();
  private _selectUserEventEmmiter = new EventEmitter();

  constructor() { }

  get selectUserEventEmmiter(){
    return this._selectUserEventEmmiter;
  }
  get findUserByIdEventEmmiter(){
    return this._findUserByIdEventEmmiter;
  }
  get newUserEventemmiter():EventEmitter<User>{
    return this._newUserEventemmiter;
  }

  get idUserEventEmmiter():EventEmitter<number>{
    return this._idUserEventEmmiter;
  }


}
