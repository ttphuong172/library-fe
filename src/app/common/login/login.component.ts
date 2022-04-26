import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    username:new FormControl(''),
    password: new FormControl()
  });
  constructor(
    private authService:AuthService,
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  login() {
    this.loginService.login(this.formLogin.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.authService.setToken(data.jwtToken);
        this.authService.setUsername(data.username);
        this.authService.setRole(data.role);
        console.log(data.role)
        if(data.role == 'ROLE_ADMIN'){
          this.router.navigateByUrl("admin/lendings");
        } else{
          this.router.navigateByUrl("books");
        }

      }
    )
  }

}
