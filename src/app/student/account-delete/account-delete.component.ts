import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../../service/account.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
    public dialogRefDelete: MatDialogRef<AccountDeleteComponent>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  closeDialogDelete() {
    this.dialogRefDelete.close();
  }

  delete(data: any) {
    this.accountService.delete(data.username).subscribe(
      (data) => {
        if (data == null) {
          this.snackBar.open("Can not delete account", 'Undo', {duration: 1500});
        } else {
          this.snackBar.open("Delete succesfull", 'Undo', {duration: 1500});
          this.dialogRefDelete.close();
          this.router.navigateByUrl("admin/accounts")
        }
      }
    )
  }
}
