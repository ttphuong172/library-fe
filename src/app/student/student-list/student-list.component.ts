import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../service/student.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: any

  constructor(
    private studentService: StudentService
  ) {
  }
  ngOnInit(): void {
    this.studentService.findAll().subscribe(
      (data) => {
        this.studentList = data;
        console.log(this.studentList);
      }
    )
  }
}
