import { ExcluirContaComponent } from './../../components/excluir-conta/excluir-conta.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deletar-conta',
  templateUrl: './deletar-conta.component.html',
  styleUrls: ['./deletar-conta.component.scss']
})
export class DeletarContaComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public deletarConta(): void {
     this.dialog.open(ExcluirContaComponent, {
      width: '450px',
    });
  }

}
