import {Component, OnInit} from '@angular/core';
import {LendingbookService} from "../../../service/lendingbook.service";
import {LendingBookDTO} from "../../model/LendingBookDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-return-create',
  templateUrl: './return-create.component.html',
  styleUrls: ['./return-create.component.css']
})
export class ReturnCreateComponent implements OnInit {
  lendingBookDTO: any;
  lendingBookDTOList: LendingBookDTO[] = [];
  idBook: any;

  constructor(
    private lendingbookService: LendingbookService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  searchLendingBook($event: any) {
    let id = $event.target.value;

    if (id == '') {
      this.snackBar.open("Please enter book id", 'Undo', {duration: 1500});
    } else {
      this.lendingbookService.findAllByBook_IdAndReturnDateIsNull(id).subscribe(
        (data) => {
          if (data ==null){
            this.snackBar.open("Book is not exist!", 'Undo', {duration: 1500});
          } else {
            this.lendingBookDTO = data;
            // console.log(this.lendingBookDTO)
            //Test book inserted into bookList
            let isExist = false;
            for (let i = 0; i < this.lendingBookDTOList.length; i++) {
              if (this.lendingBookDTO.book_id == this.lendingBookDTOList[i].book_id) {
                isExist = true;
                break;
              }
            }
            if (!isExist) {
              this.lendingBookDTOList.push(this.lendingBookDTO);
              // console.log(this.lendingBookDTOList)
            } else {
              this.snackBar.open("Book is already on the list!", 'Undo', {duration: 1500});
            }
          }
        }
      )
    }
    this.idBook='';
  }

  comfirmReturn() {
    this.lendingbookService.comfirmReturn(this.lendingBookDTOList).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.router.navigateByUrl("/admin/returns")
      }
    )
  }

  returnList() {
    this.router.navigateByUrl("/admin/returns")
  }

  deteleBook(lendingBookDTO: LendingBookDTO) {
    for (let i = 0; i < this.lendingBookDTOList.length; i++) {
      // console.log(lendingBookDTO.book_id)
      // console.log(this.lendingBookDTOList[i].book_id)
      if (lendingBookDTO.book_id == this.lendingBookDTOList[i].book_id) {
        this.lendingBookDTOList.splice(i, 1)
      }
    }
    // console.log(this.lendingBookDTOList)
  }
}
