import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../../service/account.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-student-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {
  positionList = ['STAFF', 'STUDENT'];
  roleList = ['ROLE_ADMIN', 'ROLE_USER']
  accountForm = new FormGroup({
    code: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    fullname: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    position: new FormControl('',Validators.required),
    role: new FormControl('',Validators.required)
  })

  constructor(
    public dialogRefAdd: MatDialogRef<AccountAddComponent>,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    this.accountService.save(this.accountForm.value).subscribe(
      (data) => {
        // console.log(data);
        if (data == null) {
          this.snackBar.open("Account  is exist !", 'Undo', {duration: 1500});
        } else {
          this.dialogRefAdd.close();
        }
      },
      () => {
      },
      () => {

      }
    )
  }

  closeDialogAdd() {
    this.dialogRefAdd.close();
  }
}
