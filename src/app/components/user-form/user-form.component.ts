import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  user:User;
  @Output() newUserEventemmiter:EventEmitter<User> = new EventEmitter();

  constructor(){
    this.user=new User();
  }

  onSubmit(userForm:NgForm):void{
    if(userForm.valid){
      this.newUserEventemmiter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();

  }
}
