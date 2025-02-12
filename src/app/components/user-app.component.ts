import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit{
  users:User[] = [];
  userSelected:User;

  constructor(private service:UserService){
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users=>this.users=users);
  }

  addUser(user:User){
    if(user.id>0){
      this.users = this.users.map(u=> (u.id == user.id) ? {... user}: u);
    }else{
      this.users = [... this.users,{... user, id: new Date().getTime()}];
    }
    this.userSelected = new User();

    Swal.fire({
      title: "Guardado!",
      text: "Usuario guardado con exito!",
      icon: "success"
    });
    
  }

  removeUser(id: number):void{
    Swal.fire({
      title: "Seguro que desea eliminar?",
      text: "el usuario sera eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(user=>user.id != id);

        Swal.fire({
          title: "Eliminado!",
          text: "El usuario a sido eliminado.",
          icon: "success"
        });
      }
    });


  }

  setSelectedUser(userRow:User):void{
    this.userSelected = { ... userRow };
  }
}
