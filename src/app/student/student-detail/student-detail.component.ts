import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../../service/student.service";
import {AccountService} from "../../../service/account.service";


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  borrower:any;
  returnedQuantity=0;
  constructor(
    private activatedRoute:ActivatedRoute,
    private accountService:AccountService
  ) { }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.accountService.findBorrowerById(id).subscribe(
      (data)=>{
        this.borrower=data;
        console.log(this.borrower)
        for (let i=0; i<this.borrower.bookDTOList.length; i++){
          if(this.borrower.bookDTOList[i].returnDate!=null){
            this.returnedQuantity++;
          }
        }
        console.log(this.returnedQuantity)
      }
    )
  }





}
