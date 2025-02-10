import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() users:User[] = [];
  @Output() idUserEventEmmiter:EventEmitter<number> = new EventEmitter();
  @Output() selectedUserEventemitter= new EventEmitter();

  onRemoveUser(id:number):void{
    this.idUserEventEmmiter.emit(id);
  }

  onSelectedUser(user:User):void{
    this.selectedUserEventemitter.emit(user)
  }
}
