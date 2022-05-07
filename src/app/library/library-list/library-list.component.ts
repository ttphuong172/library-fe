import { Component, OnInit } from '@angular/core';
import {LibraryService} from "../../../service/library.service";

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {
  libraryList: any;

  constructor(
    private libraryService:LibraryService
  ) { }

  ngOnInit(): void {
    this.libraryService.findAll().subscribe(
      (data)=>{
        this.libraryList=data;
      }

    )
  }

}
