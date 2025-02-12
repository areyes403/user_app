import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
})
export class UserComponent {
  users:User[] = [];

  title: string = 'Listado de usuarios';

  constructor(
    private service:UserService,
    private router:Router,
    private sharingData:SharingDataService
  ){
    if(router.getCurrentNavigation()?.extras.state){
      this.users=router.getCurrentNavigation()?.extras.state!['users'];
    }else{
      this.service.findAll().subscribe(users=> this.users = users);
    }
  }

  onRemoveUser(id:number):void{
    this.sharingData.idUserEventEmmiter.emit(id);
  }

  onSelectedUser(user:User):void{
    //this.sharingData.selectedUserEventemitter.emit(user);
    this.router.navigate(['/users/edit', user.id],{state: {user}});
  }
}
