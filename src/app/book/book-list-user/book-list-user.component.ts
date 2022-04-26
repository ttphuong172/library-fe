import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../service/book.service";
;
@Component({
  selector: 'app-book-list-user',
  templateUrl: './book-list-user.component.html',
  styleUrls: ['./book-list-user.component.css']
})
export class BookListUserComponent implements OnInit {
  p = 1;
  bookList:any;
  quantityLoan = 0;
  quantityAvailable = 0;
  isbn = '';
  title = '';
  publisher = '';
  status='';
  statusList:string[]=['','AVAILABLE','LOANED'];
  constructor(
    private bookService:BookService
  ) { }

  ngOnInit(): void {
    this.bookService.findAll().subscribe(
      (data)=>{
        this.bookList=data;
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
