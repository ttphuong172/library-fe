import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../../service/book.service";
import {LendingbookService} from "../../../service/lendingbook.service";
import {BookDeleteComponent} from "../book-delete/book-delete.component";
import {MatDialog} from "@angular/material/dialog";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {BookEditComponent} from "../book-edit/book-edit.component";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book:any;
  lendingBookDTO: any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private bookService:BookService,
    private lendingbookService:LendingbookService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));



    this.bookService.findById(id).subscribe(
      (data)=>{
        this.book=data;
      },()=>{},()=>{
        this.lendingbookService.findAllByBook_IdAndReturnDateIsNull(id).subscribe(
          (data)=>{
            // console.log(data);
            this.lendingBookDTO=data;
          }
        );
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

  openDialogEdit(book:any) {
    const dialogRefEdit = this.matDialog.open(BookEditComponent, {
      width: '1000px',
      data: book,
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
