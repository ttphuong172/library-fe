import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../service/account.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-account-detail-user',
  templateUrl: './borrower-detail-user.component.html',
  styleUrls: ['./borrower-detail-user.component.css']
})
export class BorrowerDetailUserComponent implements OnInit {
  borrower:any;
  account:any;
  username:any;
  returnedQuantity=0;

  constructor(
    private activatedRoute:ActivatedRoute,
    private accountService:AccountService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {

    this.accountService.findById(this.authService.getUsername()).subscribe(
      (data)=>{
        // console.log(data);
        this.account=data;
        this.username=this.account.username
      },()=>{},()=>{

        this.accountService.findBorrowerById(this.username).subscribe(
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
    )



  }

}
