import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RackService} from "../../../service/rack.service";
import {RackAddComponent} from "../../rack/rack-add/rack-add.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-library-detail',
  templateUrl: './library-detail.component.html',
  styleUrls: ['./library-detail.component.css']
})
export class LibraryDetailComponent implements OnInit {
  rackList: any;
  libraryName:any;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private rackService:RackService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    const name = String(this.activatedRoute.snapshot.paramMap.get('name'));
    this.libraryName=name;
    this.rackService.findAllDTOByLibrary_Name(name).subscribe(
      (data)=>{
        this.rackList=data;
      }

    )
  }

  openDialogAdd() {
    const dialogRefAdd = this.matDialog.open(RackAddComponent, {
      width: '600px',
      disableClose: true
    })
    dialogRefAdd.afterClosed().subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.ngOnInit();
      }
    )
  }
}
