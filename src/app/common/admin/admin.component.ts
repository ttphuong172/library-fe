import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {AccountService} from "../../../service/account.service";
import {PasswordComponent} from "../password/password.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: any;
  fullname:any;
  account:any;

  constructor(
    private router:Router,
    private authService:AuthService,
    private accountService:AccountService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.accountService.findById(this.authService.getUsername()).subscribe(
      (data) => {
        // console.log(data);
        this.account = data
        this.fullname = this.account.fullname;
      }
    )

    this.username = this.authService.getUsername();
  }
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('')
  }

  openDialogChangePassword() {
    const dialogRefChangePassword=this.matDialog.open(PasswordComponent,{
      width:'600px',
      disableClose:true
    })
    dialogRefChangePassword.afterClosed().subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.ngOnInit();
      }
    )
  }
}
