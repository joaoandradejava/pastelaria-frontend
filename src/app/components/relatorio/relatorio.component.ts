import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  nomeDoRelatorio: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
   }

  ngOnInit(): void {
    this.nomeDoRelatorio = this.data.nomeDoRelatorio
    document.querySelector('iframe').src = this.data.base64

  }

}
