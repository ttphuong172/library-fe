import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../service/book.service";
import {BookAddComponent} from "../book-add/book-add.component";
import {MatDialog} from "@angular/material/dialog";
import {BookDeleteComponent} from "../book-delete/book-delete.component";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: any;
  quantityLoan = 0;
  quantityAvailable = 0;
  isbn = '';
  title = '';
  publisher = '';
  status='';
  statusList:string[]=['','AVAILABLE','LOANED'];

  constructor(
    private bookService: BookService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.bookService.findAll().subscribe(
      (data) => {
        this.bookList = data;
        for (let i = 0; i < this.bookList.length; i++) {
          if (this.bookList[i].status == 'LOANED') {
            this.quantityLoan++;
          } else {
            this.quantityAvailable++;
          }
        }
      }
    )
  }





  isbnKeyup($event: any) {
    this.isbn = $event.target.value;
    this.search()
  }

  titleKeyup($event: any) {
    this.title = $event.target.value;
    this.search()
  }

  publisherKeyup($event: any) {
    this.publisher = $event.target.value;
    this.search()
  }

  search() {
    this.bookService.search(this.isbn, this.title, this.publisher,this.status).subscribe(
      (data) => {
        this.bookList=data
        this.quantityLoan=0;
        this.quantityAvailable=0;
        for (let i = 0; i < this.bookList.length; i++) {
          if (this.bookList[i].status == 'LOANED') {
            this.quantityLoan++;
          } else {
            this.quantityAvailable++;
          }
        }
      }
    )
  }

  changeStatus($event: any) {
    this.status=$event.target.value;
    this.search();
  }
}
