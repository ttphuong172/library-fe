import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LibraryService} from "../../../service/library.service";
import {RackService} from "../../../service/rack.service";
import {BookService} from "../../../service/book.service";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookTempAPI: any;
  bookForm: FormGroup | any;
  cover = '';
  number_of_pages = 0;
  subtitle = '';
  authorsAPI: any;
  libraryList: any;
  nameLibrarySelected: any;
  rackList: any;

  url: string | any;
  selectedFile: File | any;


  constructor(
    public dialogRefEdit: MatDialogRef<BookEditComponent>,
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private rackService: RackService,
    private bookService: BookService,
    private angularFireStorage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {

    this.bookForm = new FormGroup({
      isbn: new FormControl(this.data.isbn),
      id: new FormControl(this.data.id),
      title: new FormControl(this.data.title),
      cover: new FormControl(this.data.cover),
      authors: this.formBuilder.array([]),
      publisher: new FormControl(this.data.publisher),
      number_of_pages: new FormControl(this.data.number_of_pages),
      publish_date: new FormControl(this.data.publish_date),
      library: new FormControl(this.data.library),
      rack: new FormControl(this.data.rack),
    });
    //Fill data author
    for (let i = 0; i < this.data.authors.length; i++) {
      this.authors.push(this.setAuthor(this.data.authors[i].name));
    }

    this.libraryService.findAll().subscribe(
      (data) => {
        this.libraryList = data;
      },
      () => {
      },
      () => {
        this.rackService.findAll().subscribe(
          (data) => {
            this.rackList = data
          }
        )
      }
    )

  }

  update() {
    this.bookService.update(this.bookForm.value).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.dialogRefEdit.close();
      }
    )
  }

  selectFile(event: any) {
    const path = new Date().toString();
    this.selectedFile = event.target.files[0]
    // console.log(this.selectedFile)
    this.angularFireStorage.upload(path, this.selectedFile)
      .snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(path).getDownloadURL().subscribe(
          (data) => {
            this.url = data;
            // console.log(this.url)
            this.bookForm.controls['cover'].setValue(this.url)
          }
        )
      })
    ).subscribe();
  }

  changeLibrary($event: any) {
    this.nameLibrarySelected = $event.target.selectedOptions[0].innerHTML;
    // console.log(this.nameLibrarySelected)
    this.rackService.findAllByLibrary_Name(this.nameLibrarySelected).subscribe(
      (data) => {
        this.rackList = data;
        // console.log(this.rackList)
      }
    )
  }

  closeDialogEdit() {
    this.dialogRefEdit.close();
  }

  search() {

  }

  setAuthor(name: any): FormGroup {
    return this.formBuilder.group({
      name: name || ''
    })
  }


  addAuthor(): void {
    this.authors.push(this.setAuthor(null));
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }


  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }
}
