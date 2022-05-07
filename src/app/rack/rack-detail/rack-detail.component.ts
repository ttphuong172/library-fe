import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../service/book.service";
import {ActivatedRoute} from "@angular/router";
import {BookAddRackComponent} from "../book-add-rack/book-add-rack.component";
import {MatDialog} from "@angular/material/dialog";
import {RackService} from "../../../service/rack.service";
import {RackEditComponent} from "../rack-edit/rack-edit.component";

@Component({
  selector: 'app-bookcase-detail',
  templateUrl: './rack-detail.component.html',
  styleUrls: ['./rack-detail.component.css']
})
export class RackDetailComponent implements OnInit {
  rack: any;
  bookList: any;
  quantityLoan = 0;
  quantityAvailable = 0;
  p = 1;
  statusList: string[] = ['', 'AVAILABLE', 'LOANED'];
  isbn = '';
  title = '';
  publisher = '';
  status = '';

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
        // console.log(this.rack)
      },
      () => {
      },
      () => {
        this.bookService.findAllByRack_Id(id).subscribe(
          (data) => {
            this.bookList = data;
            // console.log(this.bookList)
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
    )
  }

  openDialogAdd() {
    const dialogRefAdd = this.matDialog.open(BookAddRackComponent, {
      width: '1000px',
      data: this.rack,
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

  openDialogEdit() {
    const dialogRefEdit = this.matDialog.open(RackEditComponent, {
      width: '600px',
      data: this.rack,
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

  isbnKeyup($event: any) {
    this.isbn=$event.target.value;
    this.search();
  }

  titleKeyup($event: any) {
    this.title=$event.target.value;
    this.search();
  }

  publisherKeyup($event: any) {
    this.publisher=$event.target.value;
    this.search();
  }

  changeStatus($event: any) {
    this.status = $event.target.value;
    this.search()
  }
  search(){
    this.bookService.search(this.isbn, this.title, this.publisher, this.status, this.rack.library.id, this.rack.id).subscribe(
      (data) => {
        this.bookList = data;
      }
    )
  }
}
