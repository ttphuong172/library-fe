import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LendingService} from "../../../service/lending.service";

@Component({
  selector: 'app-lending-detail',
  templateUrl: './lending-detail.component.html',
  styleUrls: ['./lending-detail.component.css']
})
export class LendingDetailComponent implements OnInit {
  lending:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private lendingService:LendingService
  ) { }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log(id);
    this.lendingService.findById(id).subscribe(
      (data)=>{
        this.lending=data;
        console.log(this.lending)
      }
    )
  }

}
