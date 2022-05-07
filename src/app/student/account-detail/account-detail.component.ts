import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../service/account.service";
import {RackEditComponent} from "../../rack/rack-edit/rack-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {AccountEditComponent} from "../account-edit/account-edit.component";
import {AccountDeleteComponent} from "../account-delete/account-delete.component";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  account:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private accountService:AccountService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    const username = String(this.activatedRoute.snapshot.paramMap.get('username'));
    this.accountService.findById(username).subscribe(
      (data)=>{
        this.account=data;
      }
    );

  }

  openDialogEdit() {
    const dialogRefEdit = this.matDialog.open(AccountEditComponent, {
      width: '800px',
      data: this.account,
      disableClose: true
    })
    dialogRefEdit.afterClosed().subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.ngOnInit();
      }
    )
  }

  openDialogDelete() {
    const dialogRefEdit = this.matDialog.open(AccountDeleteComponent, {
      width: '600px',
      data: this.account,
      disableClose: true
    })
    dialogRefEdit.afterClosed().subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.ngOnInit();
      }
    )
  }
}
