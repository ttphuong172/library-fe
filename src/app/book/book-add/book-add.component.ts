import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../service/book.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {LibraryService} from "../../../service/library.service";
import {RackService} from "../../../service/rack.service";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  bookTempAPI: any;
  bookForm: FormGroup | any;
  cover = '';
  number_of_pages = 0;
  subtitle = '';
  authorsAPI: any;
  libraryList:any;
  nameLibrarySelected:any;
  rackList: any;

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private rackService:RackService,
    private formBuilder: FormBuilder,
    public dialogRefAdd: MatDialogRef<BookAddComponent>,
  ) {
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      isbn: new FormControl(''),
      id: new FormControl(''),
      title: new FormControl(''),
      cover: new FormControl(''),
      authors: this.formBuilder.array([]),
      publisher: new FormControl(''),
      number_of_pages: new FormControl(''),
      publish_date: new FormControl(''),
      library: new FormControl(''),
      rack: new FormControl(''),
    });

    this.libraryService.findAll().subscribe(
      (data)=>{
        this.libraryList=data;
        // console.log(this.libraryList)
      }
    )
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

  search() {

    this.authors.clear();
    this.bookForm.controls['id'].reset();
    this.bookForm.controls['title'].reset();
    this.bookForm.controls['cover'].reset();
    this.bookForm.controls['number_of_pages'].reset();
    this.bookForm.controls['publisher'].reset();
    this.bookForm.controls['publish_date'].reset();


    this.bookService.searchBookByISBN(this.bookForm.controls['isbn'].value).subscribe(
      (data) => {
        this.bookTempAPI = data;
        // console.log(this.bookTempAPI);
        const isbnForm = this.bookForm.controls['isbn'].value;

        if (this.bookTempAPI["ISBN:" + isbnForm]) {
          // Set value title
          if (this.bookTempAPI["ISBN:" + isbnForm].hasOwnProperty("subtitle")) {
            this.subtitle = " : " + this.bookTempAPI["ISBN:" + isbnForm].subtitle
          }
          this.bookForm.controls['title'].setValue(
            this.bookTempAPI["ISBN:" + isbnForm].title + this.subtitle
          );

          // Set value cover
          if (this.bookTempAPI["ISBN:" + isbnForm].hasOwnProperty("cover")) {
            this.cover = this.bookTempAPI["ISBN:" + isbnForm].cover.medium;
            this.bookForm.controls['cover'].setValue(this.cover);
          }


          // Set value authors
          this.authorsAPI = this.bookTempAPI["ISBN:" + isbnForm].authors
          for (let i = 0; i < this.authorsAPI.length; i++) {
            this.authors.push(this.setAuthor(this.authorsAPI[i].name));
          }

          // Set value page
          if (this.bookTempAPI["ISBN:" + isbnForm].hasOwnProperty("number_of_pages")) {
            this.number_of_pages = this.bookTempAPI["ISBN:" + isbnForm].number_of_pages;
            this.bookForm.controls['number_of_pages'].setValue(this.number_of_pages);
          }


          // Set value pulisher
          this.bookForm.controls['publisher'].setValue(this.bookTempAPI["ISBN:" + isbnForm].publishers[0].name);


          //Set value publish_date
          this.bookForm.controls['publish_date'].setValue(this.bookTempAPI["ISBN:" + isbnForm].publish_date);

        }
      },
      ()=>{},
      ()=>{

      }
    )
  }

  save() {
    this.bookService.save(this.bookForm.value).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.dialogRefAdd.close();
      }
    )
  }

  closeDialogAdd() {
    this.dialogRefAdd.close()
  }

  changeLibrary($event: any) {
    this.nameLibrarySelected = $event.target.selectedOptions[0].innerHTML;
    // console.log(this.nameLibrarySelected)
    this.rackService.findAllByLibrary_Name(this.nameLibrarySelected).subscribe(
      (data)=>{
        this.rackList=data;
        // console.log(this.rackList)
      }
    )
  }
}
