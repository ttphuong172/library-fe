import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../service/book.service";
import {BookAddRackComponent} from "../../rack/book-add-rack/book-add-rack.component";
import {MatDialog} from "@angular/material/dialog";
import {BookDeleteComponent} from "../book-delete/book-delete.component";
import {BookAddComponent} from "../book-add/book-add.component";
import {LibraryService} from "../../../service/library.service";
import {RackService} from "../../../service/rack.service";

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
  p=1;
  libraryList: any;
  rackList: any;
  nameLibrary: any;
  idLibrary='';
  idRack='' ;

  constructor(
    private bookService: BookService,
    private matDialog: MatDialog,
    private libraryService:LibraryService,
    private rackService:RackService
  ) {
  }

  ngOnInit(): void {
    this.quantityAvailable = 0;
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
      },
      ()=>{},
      ()=>{
        this.libraryService.findAll().subscribe(
          (data)=>{
            this.libraryList=data
          },()=>{},()=>{}
        )
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
    this.p=1;
    this.bookService.search(this.isbn, this.title, this.publisher,this.status,this.idLibrary,this.idRack).subscribe(
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

  openDialogAdd() {
    const dialogRefAdd = this.matDialog.open(BookAddComponent, {
      width: '1000px',
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

  changeLibrary($event: any) {
    this.idRack='';
    this.idLibrary = $event.target.value;
    this.nameLibrary = $event.target.selectedOptions[0].innerHTML;
    this.search();
    this.rackService.findAllByLibrary_Name(this.nameLibrary).subscribe(
      (data)=>{
        this.rackList=data;
      }
    )
  }

  changeRack($event: any) {
    this.idRack=$event.target.value;
    this.search()
  }
}
