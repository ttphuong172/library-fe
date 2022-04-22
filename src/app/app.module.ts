import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookAddRackComponent} from './rack/book-add-rack/book-add-rack.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BookListComponent} from './book/book-list/book-list.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {BookDeleteComponent} from './book/book-delete/book-delete.component';
import {RackListComponent} from './rack/rack-list/rack-list.component';
import {RackDetailComponent} from './rack/rack-detail/rack-detail.component';
import {RouterModule} from "@angular/router";
import {BookDetailComponent} from './book/book-detail/book-detail.component';
import {StudentListComponent} from './student/student-list/student-list.component';
import {LendingListComponent} from './lending/lending-list/lending-list.component';
import {LendingAddComponent} from './lending/lending-add/lending-add.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LendingDetailComponent} from './lending/lending-detail/lending-detail.component';
import {StudentDetailComponent} from './student/student-detail/student-detail.component';
import {ReturnCreateComponent} from './return/return-create/return-create.component';
import {ReturnListComponent} from './return/return-list/return-list.component';
import {ReturnComponent} from './return/return/return.component';
import {LendingComponent} from './lending/lending/lending.component';
import {AdminComponent} from './common/admin/admin.component';
import { BookAddComponent } from './book/book-add/book-add.component';
import { RackAddComponent } from './rack/rack-add/rack-add.component';
import { RackEditComponent } from './rack/rack-edit/rack-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    BookAddRackComponent,
    BookListComponent,
    BookDeleteComponent,
    RackListComponent,
    RackDetailComponent,
    BookDetailComponent,
    StudentListComponent,
    LendingListComponent,
    LendingAddComponent,
    LendingDetailComponent,
    StudentDetailComponent,
    ReturnCreateComponent,
    ReturnListComponent,
    ReturnComponent,
    LendingComponent,
    AdminComponent,
    BookAddComponent,
    RackAddComponent,
    RackEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      {
        path: "", component: AdminComponent, children: [
          {path: "books", component: BookListComponent},
          {path: "books/:id", component: BookDetailComponent},
          {path: "racks", component: RackListComponent},
          {path: "racks/:id", component: RackDetailComponent},
          {path: "students", component: StudentListComponent},
          {path: "students/:id", component: StudentDetailComponent},
          {
            path: "lendings", component: LendingComponent, children: [
              {path: "", component: LendingListComponent},
              {path: "add", component: LendingAddComponent},
              {path: ":id", component: LendingDetailComponent}
            ]
          },
          {
            path: "returns", component: ReturnComponent, children: [
              {path: "", component: ReturnListComponent},
              {path: "add", component: ReturnCreateComponent}
            ]
          }
        ]
      },
    ]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
