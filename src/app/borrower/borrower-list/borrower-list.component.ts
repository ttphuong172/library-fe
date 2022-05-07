import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../service/account.service";


@Component({
  selector: 'app-student-list',
  templateUrl: './borrower-list.component.html',
  styleUrls: ['./borrower-list.component.css']
})
export class BorrowerListComponent implements OnInit {
  borrowerList: any
  p = 1;
  borrowerListTemp: any[] = [];

  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.accountService.borrowerFindAll().subscribe(
      (data) => {
        this.borrowerList = data;
        // console.log(this.borrowerList);
      }
    )
  }


  searchBorrower(fullname: string) {
    this.borrowerListTemp= [];
    this.accountService.borrowerFindAll().subscribe(
      (data) => {
        this.borrowerList = data;
        // console.log(this.borrowerList);
        for (let i = 0; i < this.borrowerList.length; i++) {
          if (this.borrowerList[i].fullname.indexOf(fullname) != -1) {
            this.borrowerListTemp.push(this.borrowerList[i])
            // console.log(this.borrowerList[i])
          }
        }
        this.borrowerList=this.borrowerListTemp;
      }
    )

  }
}
