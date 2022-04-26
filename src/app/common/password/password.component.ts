import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../service/auth.service";
import {AccountService} from "../../../service/account.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public showOldPassword: boolean = false;
  public showNewPassword: boolean = false;
  public showComfirmNewPassword: boolean = false;

  formChangePassword = new FormGroup(({
    username:new FormControl(''),
    oldPassword:new FormControl(''),
    newPassword:new FormControl(''),
    comfirmNewPassword:new FormControl('')
  }))
  constructor(
    public dialogRefChangePassword: MatDialogRef<PasswordComponent>,
    private authService:AuthService,
    private accountService:AccountService,
    private snackBar: MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.formChangePassword.controls['username'].setValue(this.authService.getUsername())
  }

  closeDialogChangePassword() {
    this.dialogRefChangePassword.close();
  }

  public toggleOldPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  public toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }
  public toggleComfirmNewPasswordVisibility(): void {
    this.showComfirmNewPassword = !this.showComfirmNewPassword;
  }

  changePassword() {
    this.accountService.changePassword(this.formChangePassword.value).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefChangePassword.close();
        sessionStorage.clear();
        this.snackBar.open("Change password succesful!", 'Undo', {duration: 1500});
        this.router.navigateByUrl('')

      }
    )
  }

}
