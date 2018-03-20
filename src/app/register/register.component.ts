import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public users:User;
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  password:string = '';
  username:string = '';
  titleAlert:string = 'This field is required';
  unameEr=false;
  pwdEr=false;

  constructor( private fb: FormBuilder,private userService:UserService, private router: Router ) {
    this.rForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(500)])],
      'rememberMe' : ''
    });
   }

  ngOnInit() {
  }

  addPost(post) {
    if(this.rForm.valid){
      this.password = post.password;
      this.username = post.username;
      console.log("post method");
      this.users=new User(this.username,this.password);
      console.log(this.users);
      this.userService.create(this.users).subscribe();
      }
    }
}
