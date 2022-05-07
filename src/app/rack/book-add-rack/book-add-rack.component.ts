import {Component, Inject, OnInit} from '@angular/core';
import {BookService} from "../../../service/book.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add-rack.component.html',
  styleUrls: ['./book-add-rack.component.css']
})
export class BookAddRackComponent implements OnInit {
  bookTempAPI: any;
  bookForm: FormGroup | any;
  cover = '';
  number_of_pages = 0;
  subtitle = '';
  book:any;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    public dialogRefAdd: MatDialogRef<BookAddRackComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
  }

  authorsAPI: any;

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      isbn: new FormControl('',Validators.required),
      id: new FormControl('',Validators.required),
      title: new FormControl('',Validators.required),
      cover: new FormControl(''),
      authors: this.formBuilder.array([],Validators.required),
      publisher: new FormControl('',Validators.required),
      number_of_pages: new FormControl('',Validators.required),
      publish_date: new FormControl('',Validators.required),
      library: new FormControl(this.data.library,Validators.required),
      rack: new FormControl(this.data,Validators.required),
    });
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
        console.log(this.bookTempAPI);
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
      }
    )
  }

  save() {
    this.bookService.save(this.bookForm.value).subscribe(
      (data) => {
        if(data == null){
          this.snackBar.open("Book ID  is exist!", 'Undo', {duration: 1500});
        } else{
          this.book=data;
          this.dialogRefAdd.close();
          this.snackBar.open("Add succesful book ID: " + this.book.id, 'Undo', {duration: 1500});
        }
      },
      () => {
      },
      () => {

      }
    )
  }

  closeDialogAdd() {
    this.dialogRefAdd.close()
  }
}

