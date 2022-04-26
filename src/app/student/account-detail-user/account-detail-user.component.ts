import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../service/account.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-account-detail-user',
  templateUrl: './account-detail-user.component.html',
  styleUrls: ['./account-detail-user.component.css']
})
export class AccountDetailUserComponent implements OnInit {
  borrower:any;
  account:any;
  id:any;
  returnedQuantity=0;

  constructor(
    private activatedRoute:ActivatedRoute,
    private accountService:AccountService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {

    this.accountService.findByUsername(this.authService.getUsername()).subscribe(
      (data)=>{
        console.log(data);
        this.account=data;
        this.id=this.account.id
      },()=>{},()=>{

        this.accountService.findBorrowerById(this.id).subscribe(
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
    )



  }

}
