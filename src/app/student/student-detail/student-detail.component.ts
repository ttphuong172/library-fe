import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../../service/student.service";


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student:any;
  returnedQuantity=0;
  constructor(
    private activatedRoute:ActivatedRoute,
    private studentService:StudentService
  ) { }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.studentService.findById(id).subscribe(
      (data)=>{
        this.student=data;
        console.log(this.student)
        for (let i=0;i<this.student.bookDTOList.length;i++){
          if(this.student.bookDTOList[i].returnDate!=null){
            this.returnedQuantity++;
          }
        }
        console.log(this.returnedQuantity)
      }
    )
  }





}
