

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loginrequest } from './login.model'; // Define your LoginRequest model
import { SocialAuthService,GoogleLoginProvider,FacebookLoginProvider,SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';
import { TokenService } from 'src/app/services/token.service';
import { TokenDto } from './models/token-dto';
import { User } from 'src/app/services/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socialUser!:SocialUser;
  userLogged! : SocialUser;
  isLogged!:boolean;

  credentials: User = { name: '', email: '',password:'' };

  constructor(
    private http:HttpClient,
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService) { }

  ngOnInit(): void { 
    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
      }
    );
  }

  onSubmit() {
    this.http.post<any>(`http://localhost:8080/api/users/login`, this.credentials, { withCredentials: true })
      .subscribe(response => {
        // Store JWT token in cookie (replace with appropriate logic for handling response)
      // this.cookieService.set('jwt-token',response.jwt,{expires:2});
        // Redirect to secure area or display success message
      }, error => {
        console.error(error);
        // Handle login errors (e.g., invalid credentials)
      });
  }
}