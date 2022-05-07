import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../../service/account.service";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  positionList = ['STAFF', 'STUDENT'];
  roleList = ['ROLE_ADMIN', 'ROLE_USER'];
  statusList: boolean[] = [true, false];

  accountForm = new FormGroup({
    code: new FormControl(''),
    username: new FormControl(''),
    fullname: new FormControl(''),
    password: new FormControl(''),
    position: new FormControl(''),
    role: new FormControl(''),
    enable: new FormControl('')
  })
  constructor(
    public dialogRefEdit: MatDialogRef<AccountEditComponent>,
    private accountService:AccountService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.accountForm.setValue(this.data);

  }

  closeDialogAdd() {
    this.dialogRefEdit.close();
  }
  update(){
    this.accountService.update(this.accountForm.value).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefEdit.close();
      }
    )
  }
}
