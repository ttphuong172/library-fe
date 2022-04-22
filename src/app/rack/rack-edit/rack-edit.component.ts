import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LibraryService} from "../../../service/library.service";
import {RackService} from "../../../service/rack.service";

@Component({
  selector: 'app-rack-edit',
  templateUrl: './rack-edit.component.html',
  styleUrls: ['./rack-edit.component.css']
})
export class RackEditComponent implements OnInit {
  libraryList: any;

  rackForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',Validators.required),
    library: new FormControl('',Validators.required)
  })
  constructor(
    public dialogRefEdit: MatDialogRef<RackEditComponent>,
    private libraryService: LibraryService,
    private rackService: RackService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.rackForm.setValue(this.data);
    console.log(this.data)
    this.libraryService.findAll().subscribe(
      (data) => {
        this.libraryList = data;
      }
    )
  }

  update() {
    this.rackService.update(this.rackForm.value).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.dialogRefEdit.close();
      }
    )
  }

  closeDialogEdit() {
     this.dialogRefEdit.close();
  }
  compareByID(obj1:any,obj2:any) {
    return obj1 && obj2 && obj1.id==obj2.id
  }
}
