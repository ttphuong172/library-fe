import {Component, OnInit} from '@angular/core';
import {RackService} from "../../../service/rack.service";
import {BookAddComponent} from "../../book/book-add/book-add.component";
import {MatDialog} from "@angular/material/dialog";
import {RackAddComponent} from "../rack-add/rack-add.component";

@Component({
  selector: 'app-bookcase-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.css']
})
export class RackListComponent implements OnInit {
  rackList: any;

  constructor(
    private rackService: RackService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.rackService.findAll().subscribe(
      (data) => {
        this.rackList = data;
        console.log(this.rackList)
      }
    )
  }

  openDialogAdd() {
    const dialogRefAdd = this.matDialog.open(RackAddComponent, {
      width: '600px',
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
}
