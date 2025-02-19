import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  user:User;
  

  constructor(
    private sharingData:SharingDataService,
    private route:ActivatedRoute,
    private service:UserService
  ){
    this.user=new User();
  }

  ngOnInit(): void {
    this.sharingData.selectUserEventEmmiter.subscribe(user=>this.user= user);
    this.route.paramMap.subscribe(params =>{
      const id:number = + (params.get('id') || '0');
      if(id > 0) {
        // this.service.findById(id).subscribe(user => this.user = user);
        this.sharingData.findUserByIdEventEmmiter.emit(id);
      }
    });
  }

  onSubmit(userForm:NgForm):void{
    if(userForm.valid){
      this.sharingData.newUserEventemmiter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm:NgForm):void{
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

}
