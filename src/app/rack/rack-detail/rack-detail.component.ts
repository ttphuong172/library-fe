import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../service/book.service";
import {ActivatedRoute} from "@angular/router";
import {BookAddComponent} from "../../book/book-add/book-add.component";
import {MatDialog} from "@angular/material/dialog";
import {RackService} from "../../../service/rack.service";

@Component({
  selector: 'app-bookcase-detail',
  templateUrl: './rack-detail.component.html',
  styleUrls: ['./rack-detail.component.css']
})
export class RackDetailComponent implements OnInit {
  rack: any;
  bookList: any;

  constructor(
    private bookService: BookService,
    private rackService: RackService,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));

    this.rackService.findById(id).subscribe(
      (data) => {
        this.rack = data;
        console.log(this.rack)
      },
      () => {
      },
      () => {
        this.bookService.findAllByRack_Id(id).subscribe(
          (data) => {
            this.bookList = data;
            console.log(this.bookList)
          }
        )
      }
    )
  }

  openDialogAdd() {
    const dialogRefAdd = this.matDialog.open(BookAddComponent, {
      width: '1000px',
      data:this.rack,
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
