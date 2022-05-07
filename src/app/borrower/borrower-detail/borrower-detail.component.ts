import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../service/account.service";


@Component({
  selector: 'app-student-detail',
  templateUrl: './borrower-detail.component.html',
  styleUrls: ['./borrower-detail.component.css']
})
export class BorrowerDetailComponent implements OnInit {
  borrower:any;
  returnedQuantity=0;
  p=1;
  constructor(
    private activatedRoute:ActivatedRoute,
    private accountService:AccountService
  ) { }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('username'));
    this.accountService.findBorrowerById(id).subscribe(
      (data)=>{
        this.borrower=data;
        // console.log(this.borrower)
        for (let i=0; i<this.borrower.bookDTOList.length; i++){
          if(this.borrower.bookDTOList[i].returnDate!=null){
            this.returnedQuantity++;
          }
        }
        // console.log(this.returnedQuantity)
      }
    )
  }





}
