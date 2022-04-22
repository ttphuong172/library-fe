import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {LibraryService} from "../../../service/library.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RackService} from "../../../service/rack.service";

@Component({
  selector: 'app-rack-add',
  templateUrl: './rack-add.component.html',
  styleUrls: ['./rack-add.component.css']
})
export class RackAddComponent implements OnInit {
  libraryList: any;

  rackForm = new FormGroup({
    name: new FormControl('',Validators.required),
    library: new FormControl('',Validators.required)
  })

  constructor(
    public dialogRefAdd: MatDialogRef<RackAddComponent>,
    private libraryService: LibraryService,
    private rackService: RackService
  ) {
  }

  ngOnInit(): void {
    this.libraryService.findAll().subscribe(
      (data) => {
        this.libraryList = data;
      }
    )
  }

  closeDialogAdd() {
    this.dialogRefAdd.close()
  }

  save() {
    this.rackService.save(this.rackForm.value).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.dialogRefAdd.close()
      }
    )
  }
}
