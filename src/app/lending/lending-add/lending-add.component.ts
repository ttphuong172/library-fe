import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../../service/book.service";
import {LendingService} from "../../../service/lending.service";
import {Book} from "../../model/Book";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {AccountService} from "../../../service/account.service";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-slip-add',
  templateUrl: './lending-add.component.html',
  styleUrls: ['./lending-add.component.css']
})
export class LendingAddComponent implements OnInit {


  book: any;
  account: any;
  bookList: Book[] = [];
  idBook: any;

  lendingForm = new FormGroup({
    id: new FormControl(''),
    account: new FormControl(''),
    loanDate: new FormControl((new Date()).toISOString().substring(0, 10)),
    bookList: new FormControl()
  })

  constructor(
    private bookService: BookService,
    private lendingService: LendingService,
    private snackBar: MatSnackBar,
    private router: Router,
    private accountService:AccountService
  ) {
  }

  ngOnInit(): void {
  }

  searchBook($event: any) {
    let id = $event.target.value;
    console.log(id)
    this.bookService.findById(id).subscribe(
      (data) => {
        if (data) {
          this.book = data

          //Test book inserted into bookList
          let isExist = false;
          for (let i = 0; i < this.bookList.length; i++) {
            if (this.book.id == this.bookList[i].id) {
              isExist = true;
              break;
            }
          }

          if (!isExist) {
            if (this.book.status == "AVAILABLE") {
              this.bookList.push(this.book)
              this.lendingForm.controls['bookList'].setValue(this.bookList)
            } else {
              this.snackBar.open("Book have been lent!", 'Undo', {duration: 1500});
            }
          } else {
            this.snackBar.open("Book is already on the list!", 'Undo', {duration: 1500});
          }
        } else {
          this.snackBar.open("Book is not exist!", 'Undo', {duration: 1500});
        }
      }
    )
    this.idBook = ''
  }

  save() {
    this.lendingService.save(this.lendingForm.value).subscribe(
      (data) => {
      },
      () => {
      },
      () => {
        this.router.navigateByUrl("/admin/lendings");
        // this.lendingPDF();
      }
    )
  }

  lendingPDF() {
    var docDefinition = {
      content: {
        text: "ABC"
      }
    }
    pdfMake.createPdf(docDefinition).print();
  }

  deteleBook(book: any) {
    for (let i = 0; i < this.bookList.length; i++) {
      if (book.id == this.bookList[i].id) {
        this.bookList.splice(i, 1)
      }
    }
  }


  searchAccount($event: any) {
    let id = $event.target.value;
    this.accountService.findById(id).subscribe(
      (data) => {
        this.account = data;
        this.lendingForm.controls['account'].setValue(data);
      }
    )
  }

  returnLending() {
    this.router.navigateByUrl("/lendings")
  }


}
