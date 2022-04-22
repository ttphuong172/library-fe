import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LendingService} from "../../../service/lending.service";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-lending-detail',
  templateUrl: './lending-detail.component.html',
  styleUrls: ['./lending-detail.component.css']
})
export class LendingDetailComponent implements OnInit {
  lending: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private lendingService: LendingService,
  ) {
  }

  ngOnInit(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log(id);
    this.lendingService.findById(id).subscribe(
      (data) => {
        this.lending = data;
        console.log(this.lending)
      }
    )
  }


  lendingPDF() {
    var body = [["Order", "ID", "ISBN", "Title"]];
    for (let i = 0; i < this.lending.bookDTOList.length; i++) {
      var bodyTemp = [];
      bodyTemp.push(i + 1)
      bodyTemp.push(this.lending.bookDTOList[i].id)
      bodyTemp.push(this.lending.bookDTOList[i].isbn)
      bodyTemp.push(this.lending.bookDTOList[i].title)
      body.push(bodyTemp)
    }
    var docDefinition = {
      pageSize: 'A5',
      pageOrientation: 'landscape',
      info: {
        title: 'Lending: ' + this.lending.student.name + "- " + this.lending.loanDate
      },
      content: [
        {
          text: 'PHIẾU MƯỢN SÁCH',
          bold: true,
          alignment: 'center',
          fontSize: 15
        },
        {
          text: 'Student ID:' + this.lending.student.id,
          fontSize: 8
        },
        {
          text: 'Student Name:' + this.lending.student.name,
          fontSize: 8
        },
        {
          text: 'Loan Date:' + this.lending.loanDate,
          fontSize: 8
        },
        {
          text: 'List of Books',
          fontSize: 8
        },
        {
          table: {
            widths: [50, 50, 100, '*'],
            body: body
          },
          fontSize: 8,
          alignment: "center"
        },
        {
          alignment: 'justify',
          columns: [
            {

            },
            {

            },
            {
              text: 'Signature Confirms'
            }
          ]
        },
      ]
    }
    // @ts-ignore
    pdfMake.createPdf(docDefinition).open();
  }
}
