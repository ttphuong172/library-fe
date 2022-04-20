import { Component, OnInit } from '@angular/core';
import {RackService} from "../../../service/rack.service";

@Component({
  selector: 'app-bookcase-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.css']
})
export class RackListComponent implements OnInit {
  bookcaseList:any;
  constructor(
    private bookcaseService:RackService
  ) { }

  ngOnInit(): void {
    this.bookcaseService.findAll().subscribe(
      (data)=>{
        this.bookcaseList=data;
        console.log(this.bookcaseList)
      }
    )
  }

}
