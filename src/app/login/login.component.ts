import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { TokenStorage } from '../services/token.storage';

const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rForm: FormGroup;
  password: string = '';
  username: string = '';
  post: any;
  error = '';
  uname = localStorage.getItem("username");
  pwd= localStorage.getItem("password");
  
  constructor(private authService:AuthService, 
              private router: Router,
              private token: TokenStorage,
              private fb: FormBuilder) { 
                this.rForm = fb.group({
                  'username': [null],
                  'password': [null],
                  'rememberMe' : ''
                });
              }

  ngOnInit() {
  }

  addlogin(post): void {
    if (this.uname == null && this.pwd == null) {
    this.authService.attemptAuth(post.username, post.password).subscribe(
      data => {
            if(data.message == "Auth successful" ){
              console.log("sucess");
              this.token.saveToken(data.token);
              if (post.rememberMe == true) {
                localStorage.setItem("username",post.username);
                localStorage.setItem("password",post.password);
              }
            } else {
              console.log("unsuess");
              this.error = data.message;
            }
      },
      error => {this.error=error;
                console.log("wrong ");
               }
    );
  } else {
    this.authService.attemptAuth(post.username || this.uname,post.password || this.pwd).subscribe(
      data => {
            if(data.message == "Auth successful" ){
              this.token.saveToken(data.token);
              console.log("sucess");
            } else {
              this.error = data.message;
            }
      },
      error => {this.error=error;
                console.log("wrong ");
               }
      );
    }
  }
}


