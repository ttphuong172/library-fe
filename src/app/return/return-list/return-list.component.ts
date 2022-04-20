import { Component, OnInit } from '@angular/core';
import {LendingbookService} from "../../../service/lendingbook.service";

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.css']
})
export class ReturnListComponent implements OnInit {
  lendingBookDTOList:any;
  constructor(
    private lendingbookService:LendingbookService
  ) { }

  ngOnInit(): void {
    this.lendingbookService.findAllByReturnDateIsNotNull().subscribe(
      (data)=>{
        this.lendingBookDTOList=data;
        console.log(this.lendingBookDTOList)
      }
    )
  }

  openDialogAdd() {

  }
}
