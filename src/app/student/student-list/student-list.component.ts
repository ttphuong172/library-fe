import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../service/student.service";
import {AccountService} from "../../../service/account.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  borrowerList: any
  p=1;

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
}
