import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit{
  users:User[] = [];

  constructor(
    private router:Router,
    private service:UserService,
    private sharingData:SharingDataService
  ){
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users=>this.users=users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  addUser(){
    this.sharingData.newUserEventemmiter.subscribe(user=>{
      if(user.id>0){
        this.service.update(user).subscribe(userUpdated => {
          this.users = this.users.map(u=>(u.id == userUpdated.id) ? {...userUpdated} : u);
        });
      }else{
        this.service.create(user).subscribe(newUser=>{
          this.users = [... this.users,{... user, id: new Date().getTime()}];
        });
      }
      this.router.navigate(['/users']);
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado con exito!",
        icon: "success"
      });
    });
  }

  findUserById(){
    this.sharingData.findUserByIdEventEmmiter.subscribe(id=>{
       const user = this.users.find(user => user.id == id);
       this.sharingData.selectUserEventEmmiter.emit(user);
    });
  }

  removeUser():void{
    this.sharingData.idUserEventEmmiter.subscribe(id=>{
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
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then(()=>{
            this.router.navigate(['/users'], {state: {users:this.users}});
          });
  
          Swal.fire({
            title: "Eliminado!",
            text: "El usuario a sido eliminado.",
            icon: "success"
          });
        }
      });
    });
  }
}
