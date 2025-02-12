import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
})
export class UserComponent {
  users:User[] = [];
  idUserEventEmmiter:EventEmitter<number> = new EventEmitter();
  selectedUserEventemitter= new EventEmitter();
  title: string = 'Listado de usuarios';

  constructor(
    private service:UserService,
    private router:Router
  ){
    if(router.getCurrentNavigation()?.extras.state){
      this.users=router.getCurrentNavigation()?.extras.state!['users'];
    }else{
      this.service.findAll().subscribe(users=> this.users = users);
    }
    
  }
  onRemoveUser(id:number):void{
    this.idUserEventEmmiter.emit(id);
  }

  onSelectedUser(user:User):void{
    this.selectedUserEventemitter.emit(user);
  }
}
