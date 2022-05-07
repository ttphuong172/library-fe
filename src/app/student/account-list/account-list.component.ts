import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../service/account.service";
import {RackAddComponent} from "../../rack/rack-add/rack-add.component";
import {MatDialog} from "@angular/material/dialog";
import {AccountAddComponent} from "../account-add/account-add.component";

@Component({
  selector: 'app-student-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accountList: any;
  code='';
  username='';
  fullname='';
  positionList = ['STAFF', 'STUDENT'];
  position='';
  constructor(
    private accountService:AccountService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.accountService.findAll().subscribe(
      (data)=>{
        this.accountList=data;
        // console.log(this.accountList)
      }
    )
  }

  openDialogAdd() {
    const dialogRefAdd = this.matDialog.open(AccountAddComponent, {
      width: '800px',
      disableClose: true
    })
    dialogRefAdd.afterClosed().subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.ngOnInit();
      }
    )
  }

  search(){
    this.accountService.search(this.code,this.username,this.fullname,this.position).subscribe(
      (data)=>{
        this.accountList=data;
      }
    )
  }

  keyupCode($event: any) {
    this.code=$event.target.value;
    // console.log(this.code);
    this.search();
  }

  keyupUsername($event: any) {
    this.username=$event.target.value;
    // console.log(this.username)
    this.search();
  }

  keyupFullname($event: any) {
    this.fullname=$event.target.value;
    this.search();
  }

  changePosition($event: any) {
    // console.log($event.target.value)
    this.position=$event.target.value
    this.search();
  }
}
