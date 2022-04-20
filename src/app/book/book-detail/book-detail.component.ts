import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../../service/book.service";
import {LendingbookService} from "../../../service/lendingbook.service";
import {BookDeleteComponent} from "../book-delete/book-delete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book:any;
  lendingBookDTO:any
  constructor(
    private activatedRoute:ActivatedRoute,
    private bookService:BookService,
    private lendingbookService:LendingbookService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));

    this.lendingbookService.findAllByBook_IdAndReturnDateIsNull(id).subscribe(
      (data)=>{
        console.log(data);
        this.lendingBookDTO=data;
      },
      ()=>{}
    );

    this.bookService.findById(id).subscribe(
      (data)=>{
        this.book=data;
        console.log(this.book)
      }
    )
  }

  openDialogDelete(book: any) {
    const dialogRefDelete = this.matDialog.open(BookDeleteComponent, {
      width: '600px',
      data: book,
      disableClose: true
    })
    dialogRefDelete.afterClosed().subscribe(
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
