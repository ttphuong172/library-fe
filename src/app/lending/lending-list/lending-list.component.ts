import { Component, OnInit } from '@angular/core';
import {LendingService} from "../../../service/lending.service";
import {LendingAddComponent} from "../lending-add/lending-add.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-slip-list',
  templateUrl: './lending-list.component.html',
  styleUrls: ['./lending-list.component.css']
})
export class LendingListComponent implements OnInit {
  lendingList:any;
  constructor(
    private lendingService:LendingService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.lendingService.findAll().subscribe(
      (data)=>{this.lendingList=data;console.log(this.lendingList)}
    )
  }

  openDialogAdd() {
    const dialogRefAdd=this.matDialog.open(LendingAddComponent,{
      width:'800px',
      disableClose:true
    })
    dialogRefAdd.afterClosed().subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.ngOnInit();
      }
    )
  }
}
