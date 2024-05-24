import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignupRequest } from "./signup.model";
import { User } from 'src/app/services/usuario';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser:User = {name:"",email: "",password:""}

  constructor(private http: HttpClient, private userService:UserService) { }

  ngOnInit(): void { }
  loadUsers(){
    
  }
  onSubmit() {
    this.userService.createUser(this.newUser).subscribe(
      response => {
        console.log('User registered successfully:',response);
      },
      error => {
        console.error('error registering user: ',error);
      }
    )
  }
}
